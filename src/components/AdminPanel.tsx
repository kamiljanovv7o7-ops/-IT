import { Fragment, useState, useEffect, FormEvent, useCallback } from 'react';
import {
  ArrowLeft,
  BadgeDollarSign,
  CheckCircle2,
  ClipboardList,
  FolderKanban,
  Lock,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import {
  ContactSettings,
  OrderRecord,
  OrderStatus,
  PortfolioItem,
  ServiceId,
  ServiceItem,
  formatMoney,
} from '../data/services';
import { ADMIN_TRANSLATIONS } from '../i18n/adminTranslations';
import type { Language, TranslationContent } from '../i18n/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ResilientImage } from './ResilientImage';
import { ScrollControls } from './ScrollControls';

interface AdminPanelProps {
  t: TranslationContent;
  language: Language;
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  contacts: ContactSettings;
  onLanguageChange: (lang: Language) => void;
  onSiteDataUpdated: () => Promise<void>;
  onExitAdmin: () => void;
}

type AdminTab = 'orders' | 'services' | 'portfolio' | 'settings';
type OrderFilter = 'all' | OrderStatus;

const TOKEN_STORAGE_KEY = 'sanarip_admin_token';

const STATUS_STYLE: Record<OrderStatus, string> = {
  new: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  in_progress: 'border-sky-500/40 bg-sky-500/10 text-sky-300',
  completed: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  cancelled: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
};

export function AdminPanel({
  t,
  language,
  services,
  portfolio,
  contacts,
  onLanguageChange,
  onSiteDataUpdated,
  onExitAdmin,
}: AdminPanelProps) {
  const adminT = ADMIN_TRANSLATIONS[language];

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [checkingSession, setCheckingSession] = useState<boolean>(!!token);

  // Login state
  const [loginEmail, setLoginEmail] = useState('kamiljanovv7o7@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Workspace state
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState<OrderFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [confirmDeleteOrderId, setConfirmDeleteOrderId] = useState<string | null>(null);
  const [confirmDeletePortfolioId, setConfirmDeletePortfolioId] = useState<string | null>(null);

  // Service price editor state
  const [priceDrafts, setPriceDrafts] = useState<Record<ServiceId, string>>({
    menu: '20',
    vizitka: '10',
    video: '500',
    website: '450',
  });
  const [savingServiceId, setSavingServiceId] = useState<ServiceId | null>(null);
  const [savedServiceId, setSavedServiceId] = useState<ServiceId | null>(null);

  // Portfolio add form state
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState<'menu' | 'vizitka' | 'video' | 'website'>('menu');
  const [pClient, setPClient] = useState('');
  const [pMetric, setPMetric] = useState('');
  const [pYear, setPYear] = useState('2026');
  const [pSummary, setPSummary] = useState('');
  const [pStatusMsg, setPStatusMsg] = useState<string | null>(null);
  const [pErrorMsg, setPErrorMsg] = useState<string | null>(null);

  // Contacts editor state
  const [contactDraft, setContactDraft] = useState<ContactSettings>(contacts);
  const [contactsSaved, setContactsSaved] = useState(false);

  // Password editor state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<'saved' | 'error' | null>(null);

  useEffect(() => {
    const nextDrafts: Record<ServiceId, string> = {
      menu: String(services.find((s) => s.id === 'menu')?.unitPrice ?? 20),
      vizitka: String(services.find((s) => s.id === 'vizitka')?.unitPrice ?? 10),
      video: String(services.find((s) => s.id === 'video')?.unitPrice ?? 500),
      website: String(services.find((s) => s.id === 'website')?.unitPrice ?? 450),
    };
    setPriceDrafts(nextDrafts);
  }, [services]);

  useEffect(() => {
    setContactDraft(contacts);
  }, [contacts]);

  const handleLogout = useCallback(() => {
    setToken(null);
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const fetchOrders = useCallback(
    async (authToken: string) => {
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const res = await fetch('/api/admin/orders', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.status === 401) {
          handleLogout();
          return;
        }
        if (!res.ok) throw new Error('Failed to load orders');
        const data = (await res.json()) as { orders: OrderRecord[] };
        setOrders(data.orders || []);
      } catch {
        setOrdersError('load_failed');
      } finally {
        setOrdersLoading(false);
      }
    },
    [handleLogout]
  );

  useEffect(() => {
    if (!token) {
      setCheckingSession(false);
      return;
    }

    let cancelled = false;
    fetch('/api/admin/session', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid session');
        if (!cancelled) {
          setCheckingSession(false);
          void fetchOrders(token);
        }
      })
      .catch(() => {
        if (!cancelled) {
          handleLogout();
          setCheckingSession(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token, fetchOrders, handleLogout]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail.trim(),
          password: loginPassword,
        }),
      });
      if (!res.ok) {
        setLoginError(adminT.login.invalidError);
        return;
      }
      const data = (await res.json()) as { token: string };
      try {
        localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      } catch {
        // Ignore storage errors
      }
      setLoginPassword('');
      setToken(data.token);
    } catch {
      setLoginError(adminT.login.invalidError);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (
    orderId: string,
    nextStatus: OrderStatus
  ) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) return;
      const data = (await res.json()) as { order: OrderRecord };
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? data.order : o))
      );
    } catch {
      // Keep UI state intact
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) return;
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch {
      // Keep UI state intact
    }
  };

  const handleSaveServicePrice = async (serviceId: ServiceId) => {
    if (!token) return;
    const numericPrice = Number(priceDrafts[serviceId]);
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) return;
    setSavingServiceId(serviceId);
    setSavedServiceId(null);
    try {
      const res = await fetch(`/api/admin/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ unitPrice: numericPrice }),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (res.ok) {
        await onSiteDataUpdated();
        setSavedServiceId(serviceId);
      }
    } finally {
      setSavingServiceId(null);
    }
  };

  const handleAddPortfolio = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setPStatusMsg(null);
    setPErrorMsg(null);

    if (pTitle.trim().length < 2 || pSummary.trim().length < 4) {
      setPErrorMsg(adminT.portfolioEditor.errorMsg);
      return;
    }

    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryKey: pCategory,
          title: pTitle.trim(),
          client: pClient.trim(),
          resultMetric: pMetric.trim(),
          year: pYear.trim(),
          summary: pSummary.trim(),
        }),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) {
        setPErrorMsg(adminT.portfolioEditor.errorMsg);
        return;
      }
      setPTitle('');
      setPClient('');
      setPMetric('');
      setPSummary('');
      setPStatusMsg(adminT.portfolioEditor.addedMsg);
      await onSiteDataUpdated();
    } catch {
      setPErrorMsg(adminT.portfolioEditor.errorMsg);
    }
  };

  const handleDeletePortfolio = async (itemId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${itemId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (res.ok) {
        await onSiteDataUpdated();
      }
    } catch {
      // Ignore network errors
    }
  };

  const handleSaveContacts = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setContactsSaved(false);
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contactDraft),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (res.ok) {
        await onSiteDataUpdated();
        setContactsSaved(true);
      }
    } catch {
      // Ignore network errors
    }
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setPasswordStatus(null);
    try {
      const res = await fetch('/api/admin/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      if (!res.ok) {
        setPasswordStatus('error');
        return;
      }
      setCurrentPassword('');
      setNewPassword('');
      setPasswordStatus('saved');
    } catch {
      setPasswordStatus('error');
    }
  };

  // Filtered orders & KPI calculations
  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = orderFilter === 'all' || ord.status === orderFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      ord.name.toLowerCase().includes(q) ||
      ord.phone.toLowerCase().includes(q) ||
      ord.id.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const newOrdersCount = orders.filter((o) => o.status === 'new').length;
  const completedCount = orders.filter((o) => o.status === 'completed').length;
  const kgsTotal = orders
    .filter((o) => o.currency === 'KGS' && o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.totalAmount, 0);
  const usdTotal = orders
    .filter((o) => o.currency === 'USD' && o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.totalAmount, 0);

  if (checkingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060B14] px-4 text-slate-300">
        <div className="text-sm font-medium">{adminT.login.submitting}</div>
      </div>
    );
  }

  // Login Screen
  if (!token) {
    return (
      <div className="flex min-h-screen flex-col bg-[#060B14] text-slate-100">
        <header className="border-b border-slate-800/80 bg-[#060B14]">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>{adminT.backToSite}</span>
            </button>
            <LanguageSwitcher
              language={language}
              onChange={onLanguageChange}
              ariaLabel={t.languageLabel}
              compact
            />
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-800 bg-[#0B1220] p-6 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <Lock className="h-5 w-5" aria-hidden="true" />
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight text-white">
              {adminT.login.title}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {adminT.login.subtitle}
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-medium text-slate-200"
                >
                  {adminT.login.emailLabel}
                </label>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3.5 text-sm text-white focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-slate-200"
                >
                  {adminT.login.passwordLabel}
                </label>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3.5 text-sm text-white focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              {loginError && (
                <div
                  role="alert"
                  className="flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:opacity-60 cursor-pointer"
              >
                {loginLoading ? adminT.login.submitting : adminT.login.submitBtn}
              </button>
            </form>

            <p className="mt-5 border-t border-slate-800 pt-4 text-xs text-slate-400">
              {adminT.login.defaultHint}{' '}
              <span className="font-mono text-slate-300">
                kamiljanovv7o7@gmail.com
              </span>{' '}
              / <span className="font-mono text-emerald-400">admin2026</span>
            </p>
          </div>
        </main>
      </div>
    );
  }

  const navTabs: { id: AdminTab; label: string; icon: typeof ClipboardList; count?: number }[] = [
    {
      id: 'orders',
      label: adminT.tabs.orders,
      icon: ClipboardList,
      count: newOrdersCount > 0 ? newOrdersCount : undefined,
    },
    { id: 'services', label: adminT.tabs.services, icon: BadgeDollarSign },
    { id: 'portfolio', label: adminT.tabs.portfolio, icon: FolderKanban },
    { id: 'settings', label: adminT.tabs.settings, icon: Settings },
  ];

  const activeTabLabel =
    navTabs.find((tab) => tab.id === activeTab)?.label ?? adminT.tabs.orders;

  const handleTabSelect = (nextTab: AdminTab) => {
    setActiveTab(nextTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#060B14] text-slate-100 lg:flex-row">
      {/* Workspace Sidebar */}
      <aside className="border-b border-slate-800 bg-[#080E1A] lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <span className="text-base font-bold tracking-tight text-white">
            {language === 'en' ? 'Sanarip' : 'Санарип'}{' '}
            <span className="text-emerald-400">IT</span>
          </span>
          <span className="text-xs font-medium text-slate-400">Admin</span>
        </div>

        <nav
          aria-label={adminT.breadcrumbSection}
          className="flex gap-1 overflow-x-auto touch-pan-y p-3 lg:flex-col"
        >
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabSelect(tab.id)}
                className={`flex min-h-[42px] items-center justify-between gap-3 rounded-lg px-3.5 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white border border-transparent'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{tab.label}</span>
                </span>
                {tab.count !== undefined && (
                  <span className="font-mono text-xs font-semibold text-amber-300 tabular-nums">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Breadcrumb Bar */}
        <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-[#060B14]/95 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>{adminT.breadcrumbRoot}</span>
            <span aria-hidden="true">/</span>
            <span>{adminT.breadcrumbSection}</span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-white">{activeTabLabel}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher
              language={language}
              onChange={onLanguageChange}
              ariaLabel={t.languageLabel}
              compact
            />
            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-200 whitespace-nowrap transition-colors hover:border-slate-500 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{adminT.backToSite}</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 whitespace-nowrap transition-colors hover:border-rose-500/40 hover:text-rose-300 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{adminT.logout}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* 4-Column KPI Strip */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-slate-800 bg-[#0B1220] p-5">
                  <p className="text-xs font-medium text-slate-400">
                    {adminT.kpi.totalOrders}
                  </p>
                  <p className="mt-2 font-mono text-2xl font-bold text-white tabular-nums">
                    {orders.length}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-[#0B1220] p-5">
                  <p className="text-xs font-medium text-slate-400">
                    {adminT.kpi.newOrders}
                  </p>
                  <p className="mt-2 font-mono text-2xl font-bold text-amber-300 tabular-nums">
                    {newOrdersCount}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-[#0B1220] p-5">
                  <p className="text-xs font-medium text-slate-400">
                    {adminT.kpi.completedOrders}
                  </p>
                  <p className="mt-2 font-mono text-2xl font-bold text-emerald-400 tabular-nums">
                    {completedCount}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-[#0B1220] p-5">
                  <p className="text-xs font-medium text-slate-400">
                    {adminT.kpi.totalRevenue}
                  </p>
                  <p className="mt-2 font-mono text-lg font-bold text-white tabular-nums">
                    {formatMoney(kgsTotal, t.calculator.somCurrency)}
                    {usdTotal > 0 && (
                      <span className="ml-2 text-sm text-emerald-400">
                        + {formatMoney(usdTotal, t.servicesSection.items.website.currencyLabel)}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Filter & Search Toolbar */}
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div
                  className="inline-flex flex-wrap gap-1 rounded-lg border border-slate-800 bg-[#0B1220] p-1"
                  role="tablist"
                >
                  {(['all', 'new', 'in_progress', 'completed', 'cancelled'] as OrderFilter[]).map(
                    (statusKey) => (
                      <button
                        key={statusKey}
                        type="button"
                        role="tab"
                        aria-selected={orderFilter === statusKey}
                        onClick={() => setOrderFilter(statusKey)}
                        className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                          orderFilter === statusKey
                            ? 'bg-emerald-500 text-slate-950'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {statusKey === 'all'
                          ? adminT.orders.filterAll
                          : adminT.orders.statuses[statusKey]}
                      </button>
                    )
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative flex-1 sm:w-64 sm:flex-none">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={adminT.orders.searchPlaceholder}
                      className="h-10 w-full rounded-lg border border-slate-800 bg-[#0B1220] pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => token && void fetchOrders(token)}
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-800 bg-[#0B1220] px-3.5 text-xs font-semibold text-slate-200 hover:border-slate-700 hover:text-white cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{adminT.orders.refreshBtn}</span>
                  </button>
                </div>
              </div>

              {/* Orders Data Table */}
              <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0B1220]">
                {ordersLoading ? (
                  <div className="space-y-2 p-4">
                    {[1, 2, 3].map((row) => (
                      <div
                        key={row}
                        className="h-11 animate-pulse rounded-lg bg-slate-800/60"
                      />
                    ))}
                  </div>
                ) : ordersError ? (
                  <div className="p-8 text-center text-sm text-rose-300">
                    {adminT.orders.emptySubtitle}
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-base font-semibold text-white">
                      {adminT.orders.emptyTitle}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {adminT.orders.emptySubtitle}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto touch-pan-y">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 text-xs font-medium text-slate-400">
                          <th className="px-4 py-3">{adminT.orders.colId}</th>
                          <th className="px-4 py-3">{adminT.orders.colClient}</th>
                          <th className="px-4 py-3">{adminT.orders.colService}</th>
                          <th className="px-4 py-3 text-right">{adminT.orders.colQty}</th>
                          <th className="px-4 py-3 text-right">{adminT.orders.colTotal}</th>
                          <th className="px-4 py-3">{adminT.orders.colStatus}</th>
                          <th className="px-4 py-3 text-right">{adminT.orders.colActions}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/70">
                        {filteredOrders.map((ord) => {
                          const serviceCopy = t.servicesSection.items[ord.serviceId];
                          const currencyLabel =
                            ord.currency === 'USD'
                              ? t.servicesSection.items.website.currencyLabel
                              : t.calculator.somCurrency;
                          const isExpanded = expandedOrderId === ord.id;
                          return (
                            <Fragment key={ord.id}>
                              <tr
                                onClick={() =>
                                  setExpandedOrderId(isExpanded ? null : ord.id)
                                }
                                className="h-12 transition-colors hover:bg-slate-800/40 cursor-pointer"
                              >
                                <td className="px-4 py-2.5 font-mono text-xs text-slate-400 tabular-nums whitespace-nowrap">
                                  {ord.id}
                                </td>
                                <td className="px-4 py-2.5">
                                  <div className="font-medium text-white">
                                    {ord.name}
                                  </div>
                                  <div className="font-mono text-xs text-slate-400 tabular-nums">
                                    {ord.phone}
                                  </div>
                                </td>
                                <td className="px-4 py-2.5 text-slate-200 whitespace-nowrap">
                                  {serviceCopy.title}
                                </td>
                                <td className="px-4 py-2.5 text-right font-mono text-slate-200 tabular-nums whitespace-nowrap">
                                  {ord.quantity} {serviceCopy.unitLabel}
                                </td>
                                <td className="px-4 py-2.5 text-right font-mono font-semibold text-emerald-400 tabular-nums whitespace-nowrap">
                                  {formatMoney(ord.totalAmount, currencyLabel)}
                                </td>
                                <td
                                  className="px-4 py-2.5 whitespace-nowrap"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <select
                                    aria-label={`${ord.id} ${adminT.orders.colStatus}`}
                                    value={ord.status}
                                    onChange={(e) =>
                                      void handleUpdateOrderStatus(
                                        ord.id,
                                        e.target.value as OrderStatus
                                      )
                                    }
                                    className={`h-8 rounded-md border px-2 text-xs font-semibold focus:outline-none ${STATUS_STYLE[ord.status]}`}
                                  >
                                    {(
                                      ['new', 'in_progress', 'completed', 'cancelled'] as OrderStatus[]
                                    ).map((st) => (
                                      <option
                                        key={st}
                                        value={st}
                                        className="bg-[#0B1220] text-slate-100"
                                      >
                                        {adminT.orders.statuses[st]}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td
                                  className="px-4 py-2.5 text-right whitespace-nowrap"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {confirmDeleteOrderId === ord.id ? (
                                    <div className="inline-flex items-center gap-1.5">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setConfirmDeleteOrderId(null);
                                          void handleDeleteOrder(ord.id);
                                        }}
                                        className="h-8 rounded-md border border-rose-500/50 bg-rose-500/20 px-2.5 text-xs font-semibold text-rose-200 hover:bg-rose-500/30 cursor-pointer"
                                      >
                                        {adminT.portfolioEditor.deleteBtn}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setConfirmDeleteOrderId(null)}
                                        className="h-8 rounded-md border border-slate-700 px-2 text-xs text-slate-300 hover:text-white cursor-pointer"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteOrderId(ord.id)}
                                      aria-label={`${adminT.portfolioEditor.deleteBtn} ${ord.id}`}
                                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 text-slate-400 transition-colors hover:border-rose-500/40 hover:text-rose-300 cursor-pointer"
                                    >
                                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                                    </button>
                                  )}
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr
                                  key={`${ord.id}-detail`}
                                  className="bg-[#070C17]"
                                >
                                  <td colSpan={7} className="px-4 py-3 text-xs text-slate-300">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                      <div>
                                        <span className="font-semibold text-slate-400">
                                          {adminT.orders.commentLabel}{' '}
                                        </span>
                                        <span>
                                          {ord.comment || adminT.orders.noComment}
                                        </span>
                                      </div>
                                      <span className="font-mono text-slate-500 tabular-nums">
                                        {new Date(ord.createdAt).toLocaleString()}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES & PRICING */}
          {activeTab === 'services' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {adminT.servicesEditor.title}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {adminT.servicesEditor.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {services.map((srv) => {
                  const copy = t.servicesSection.items[srv.id];
                  const isSaving = savingServiceId === srv.id;
                  const isSaved = savedServiceId === srv.id;
                  return (
                    <div
                      key={srv.id}
                      className="rounded-xl border border-slate-800 bg-[#0B1220] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-white">
                          {copy.title}
                        </h3>
                        <span className="font-mono text-xs text-slate-400">
                          {copy.perUnitNote}
                        </span>
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor={`price-${srv.id}`}
                          className="block text-xs font-medium text-slate-400"
                        >
                          {adminT.servicesEditor.unitPriceLabel} ({copy.currencyLabel})
                        </label>
                        <div className="mt-1.5 flex items-center gap-2.5">
                          <input
                            id={`price-${srv.id}`}
                            type="number"
                            min={1}
                            value={priceDrafts[srv.id]}
                            onChange={(e) => {
                              if (savedServiceId === srv.id) {
                                setSavedServiceId(null);
                              }
                              setPriceDrafts((prev) => ({
                                ...prev,
                                [srv.id]: e.target.value,
                              }));
                            }}
                            className="h-10 flex-1 rounded-lg border border-slate-700 bg-[#060B14] px-3 font-mono text-sm text-white tabular-nums focus:border-emerald-400 focus:outline-none"
                          />
                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={() => void handleSaveServicePrice(srv.id)}
                            className="h-10 rounded-lg bg-emerald-500 px-4 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:opacity-60 cursor-pointer"
                          >
                            {adminT.servicesEditor.saveBtn}
                          </button>
                        </div>
                      </div>

                      {isSaved && (
                        <p className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{adminT.servicesEditor.savedMsg}</span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {adminT.portfolioEditor.title}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  {adminT.portfolioEditor.subtitle}
                </p>
              </div>

              <form
                onSubmit={handleAddPortfolio}
                className="rounded-xl border border-slate-800 bg-[#0B1220] p-6 space-y-4"
              >
                <h3 className="text-base font-semibold text-white">
                  {adminT.portfolioEditor.addTitle}
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="p-title"
                      className="block text-xs font-medium text-slate-400"
                    >
                      {adminT.portfolioEditor.fieldTitle}
                    </label>
                    <input
                      id="p-title"
                      type="text"
                      value={pTitle}
                      onChange={(e) => setPTitle(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="p-category"
                      className="block text-xs font-medium text-slate-400"
                    >
                      {adminT.portfolioEditor.fieldCategory}
                    </label>
                    <select
                      id="p-category"
                      value={pCategory}
                      onChange={(e) =>
                        setPCategory(
                          e.target.value as 'menu' | 'vizitka' | 'video' | 'website'
                        )
                      }
                      className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="menu">{t.portfolio.categories.menu}</option>
                      <option value="vizitka">{t.portfolio.categories.vizitka}</option>
                      <option value="video">{t.portfolio.categories.video}</option>
                      <option value="website">{t.portfolio.categories.website}</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="p-year"
                      className="block text-xs font-medium text-slate-400"
                    >
                      {adminT.portfolioEditor.fieldYear}
                    </label>
                    <input
                      id="p-year"
                      type="text"
                      value={pYear}
                      onChange={(e) => setPYear(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 font-mono text-sm text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="p-client"
                      className="block text-xs font-medium text-slate-400"
                    >
                      {adminT.portfolioEditor.fieldClient}
                    </label>
                    <input
                      id="p-client"
                      type="text"
                      value={pClient}
                      onChange={(e) => setPClient(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="p-metric"
                      className="block text-xs font-medium text-slate-400"
                    >
                      {adminT.portfolioEditor.fieldMetric}
                    </label>
                    <input
                      id="p-metric"
                      type="text"
                      value={pMetric}
                      onChange={(e) => setPMetric(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="p-summary"
                    className="block text-xs font-medium text-slate-400"
                  >
                    {adminT.portfolioEditor.fieldSummary}
                  </label>
                  <textarea
                    id="p-summary"
                    rows={2}
                    value={pSummary}
                    onChange={(e) => setPSummary(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-700 bg-[#060B14] p-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                {pErrorMsg && (
                  <p className="text-xs text-rose-300">{pErrorMsg}</p>
                )}
                {pStatusMsg && (
                  <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{pStatusMsg}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 cursor-pointer"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  <span>{adminT.portfolioEditor.addBtn}</span>
                </button>
              </form>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {portfolio.map((item) => {
                  const copy = item.customCopy ?? t.portfolio.items[item.id];
                  const title = copy ? copy.title : item.id;
                  const metric = copy ? copy.resultMetric : item.year;
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-[#0B1220]"
                    >
                      <div>
                        <div className="aspect-[4/3] w-full bg-slate-900">
                          <ResilientImage
                            src={item.image}
                            alt={title}
                            fallbackTitle={title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="text-emerald-400">
                              {t.portfolio.categories[item.categoryKey]}
                            </span>
                            <span>·</span>
                            <span>{metric}</span>
                          </div>
                          <h4 className="mt-1.5 text-sm font-semibold text-white">
                            {title}
                          </h4>
                        </div>
                      </div>

                      <div className="border-t border-slate-800 px-4 py-3 flex justify-end">
                        {confirmDeletePortfolioId === item.id ? (
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setConfirmDeletePortfolioId(null);
                                void handleDeletePortfolio(item.id);
                              }}
                              className="rounded-md border border-rose-500/50 bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-200 hover:bg-rose-500/30 cursor-pointer"
                            >
                              {adminT.portfolioEditor.deleteBtn}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeletePortfolioId(null)}
                              className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:text-white cursor-pointer"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeletePortfolioId(item.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-300 hover:text-rose-200 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{adminT.portfolioEditor.deleteBtn}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: CONTACTS & PASSWORD */}
          {activeTab === 'settings' && (
            <div className="grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
              <form
                onSubmit={handleSaveContacts}
                className="rounded-xl border border-slate-800 bg-[#0B1220] p-6 space-y-4"
              >
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {adminT.settingsEditor.contactsTitle}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    {adminT.settingsEditor.contactsSubtitle}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400">
                    {adminT.settingsEditor.phoneLabel}
                  </label>
                  <input
                    type="text"
                    value={contactDraft.phone}
                    onChange={(e) =>
                      setContactDraft((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 font-mono text-sm text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400">
                    {adminT.settingsEditor.telegramLabel}
                  </label>
                  <input
                    type="text"
                    value={contactDraft.telegram}
                    onChange={(e) =>
                      setContactDraft((p) => ({ ...p, telegram: e.target.value }))
                    }
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 font-mono text-sm text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400">
                    {adminT.settingsEditor.instagramLabel}
                  </label>
                  <input
                    type="text"
                    value={contactDraft.instagram}
                    onChange={(e) =>
                      setContactDraft((p) => ({ ...p, instagram: e.target.value }))
                    }
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 font-mono text-sm text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400">
                    {adminT.settingsEditor.addressLabel}
                  </label>
                  <input
                    type="text"
                    value={contactDraft.address}
                    onChange={(e) =>
                      setContactDraft((p) => ({ ...p, address: e.target.value }))
                    }
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400">
                    {adminT.settingsEditor.mapsQueryLabel}
                  </label>
                  <input
                    type="text"
                    value={contactDraft.mapsQuery}
                    onChange={(e) =>
                      setContactDraft((p) => ({
                        ...p,
                        mapsQuery: e.target.value,
                      }))
                    }
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                {contactsSaved && (
                  <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{adminT.settingsEditor.contactsSavedMsg}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400 cursor-pointer"
                >
                  {adminT.settingsEditor.saveContactsBtn}
                </button>
              </form>

              <form
                onSubmit={handleUpdatePassword}
                className="rounded-xl border border-slate-800 bg-[#0B1220] p-6 space-y-4 self-start"
              >
                <h2 className="text-lg font-bold text-white">
                  {adminT.settingsEditor.passwordTitle}
                </h2>

                <div>
                  <label className="block text-xs font-medium text-slate-400">
                    {adminT.settingsEditor.currentPasswordLabel}
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400">
                    {adminT.settingsEditor.newPasswordLabel}
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1.5 h-10 w-full rounded-lg border border-slate-700 bg-[#060B14] px-3 text-sm text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                {passwordStatus === 'saved' && (
                  <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{adminT.settingsEditor.passwordSavedMsg}</span>
                  </p>
                )}
                {passwordStatus === 'error' && (
                  <p className="text-xs text-rose-300">
                    {adminT.settingsEditor.passwordErrorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex min-h-[42px] items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:border-emerald-500/50 cursor-pointer"
                >
                  {adminT.settingsEditor.savePasswordBtn}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      <ScrollControls language={language} />
    </div>
  );
}
