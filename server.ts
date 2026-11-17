import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = 3000;

type ServiceId = 'menu' | 'vizitka' | 'video' | 'website';
type OrderStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';
type PortfolioCategoryKey = 'menu' | 'vizitka' | 'video' | 'website';

interface ServiceConfig {
  id: ServiceId;
  number: string;
  unitPrice: number;
  currency: 'KGS' | 'USD';
  defaultQuantity: number;
  minQuantity: number;
  stepQuantity: number;
  supportsQuickCalculator: boolean;
}

interface CustomPortfolioText {
  title: string;
  client: string;
  resultMetric: string;
  summary: string;
}

interface PortfolioRecord {
  id: string;
  categoryKey: PortfolioCategoryKey;
  serviceId: ServiceId;
  year: string;
  image: string;
  customCopy?: CustomPortfolioText;
}

interface OrderRecord {
  id: string;
  name: string;
  phone: string;
  serviceId: ServiceId;
  quantity: number;
  unitPrice: number;
  currency: 'KGS' | 'USD';
  totalAmount: number;
  comment: string;
  status: OrderStatus;
  createdAt: string;
}

interface ContactSettings {
  phone: string;
  telegram: string;
  instagram: string;
  address: string;
  mapsQuery: string;
}

interface StoreData {
  services: ServiceConfig[];
  portfolio: PortfolioRecord[];
  orders: OrderRecord[];
  contacts: ContactSettings;
  adminAuth: {
    email: string;
    salt: string;
    passwordHash: string;
  };
}

const SESSION_SECRET =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, salt: string, expectedHash: string): boolean {
  const actual = Buffer.from(hashPassword(password, salt), 'hex');
  const expected = Buffer.from(expectedHash, 'hex');
  if (actual.length !== expected.length) return false;
  return crypto.timingSafeEqual(actual, expected);
}

function createSessionToken(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7,
    })
  ).toString('base64url');
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  return `${payload}.${sig}`;
}

function verifySessionToken(token: string): { email: string } | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return null;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      email?: string;
      exp?: number;
    };
    if (!parsed.email || !parsed.exp || Date.now() > parsed.exp) {
      return null;
    }
    return { email: parsed.email };
  } catch {
    return null;
  }
}

function createInitialStore(): StoreData {
  const initialPassword = process.env.ADMIN_PASSWORD || 'admin2026';
  const salt = crypto.randomBytes(16).toString('hex');

  return {
    services: [
      {
        id: 'menu',
        number: '01',
        unitPrice: 20,
        currency: 'KGS',
        defaultQuantity: 50,
        minQuantity: 1,
        stepQuantity: 10,
        supportsQuickCalculator: true,
      },
      {
        id: 'vizitka',
        number: '02',
        unitPrice: 10,
        currency: 'KGS',
        defaultQuantity: 100,
        minQuantity: 1,
        stepQuantity: 50,
        supportsQuickCalculator: true,
      },
      {
        id: 'video',
        number: '03',
        unitPrice: 500,
        currency: 'KGS',
        defaultQuantity: 1,
        minQuantity: 1,
        stepQuantity: 1,
        supportsQuickCalculator: false,
      },
      {
        id: 'website',
        number: '04',
        unitPrice: 450,
        currency: 'USD',
        defaultQuantity: 1,
        minQuantity: 1,
        stepQuantity: 1,
        supportsQuickCalculator: false,
      },
    ],
    portfolio: [
      {
        id: 'p1',
        categoryKey: 'menu',
        serviceId: 'menu',
        year: '2026',
        image: '/src/assets/images/portfolio_menu_cafe_1794507822370.jpg',
      },
      {
        id: 'p2',
        categoryKey: 'vizitka',
        serviceId: 'vizitka',
        year: '2026',
        image: '/src/assets/images/portfolio_vizitka_brand_1794507821557.jpg',
      },
      {
        id: 'p3',
        categoryKey: 'video',
        serviceId: 'video',
        year: '2026',
        image: '/src/assets/images/portfolio_promo_video_1794507822632.jpg',
      },
      {
        id: 'p4',
        categoryKey: 'website',
        serviceId: 'website',
        year: '2026',
        image: '/src/assets/images/portfolio_web_platform_1794507822661.jpg',
      },
      {
        id: 'p5',
        categoryKey: 'menu',
        serviceId: 'menu',
        year: '2025',
        image: '/src/assets/images/portfolio_qr_menu_1794507823069.jpg',
      },
      {
        id: 'p6',
        categoryKey: 'website',
        serviceId: 'website',
        year: '2025',
        image: '/src/assets/images/portfolio_ecommerce_site_1794507823424.jpg',
      },
    ],
    orders: [
      {
        id: 'ORD-1003',
        name: 'Бакытбек Токтогулов',
        phone: '0 700 412 880',
        serviceId: 'menu',
        quantity: 120,
        unitPrice: 20,
        currency: 'KGS',
        totalAmount: 2400,
        comment: 'Кафе үчүн 120 даана ламинацияланган меню керек.',
        status: 'new',
        createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      },
      {
        id: 'ORD-1002',
        name: 'Айжан Сатыбалдиева',
        phone: '0 555 891 204',
        serviceId: 'vizitka',
        quantity: 500,
        unitPrice: 10,
        currency: 'KGS',
        totalAmount: 5000,
        comment: 'Эки тараптуу кара матовый визитка, логотип даяр.',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
      {
        id: 'ORD-1001',
        name: 'Тимур Жумабаев',
        phone: '0 772 309 115',
        serviceId: 'website',
        quantity: 1,
        unitPrice: 450,
        currency: 'USD',
        totalAmount: 450,
        comment: 'Курулуш компаниясы үчүн корпоративдик сайт.',
        status: 'completed',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
      },
    ],
    contacts: {
      phone: '0 559 146 555',
      telegram: '0559146555',
      instagram: '@kamiljanovv.797',
      address: 'Фучика көчөсү, 18',
      mapsQuery: 'Бишкек, улица Фучика 18',
    },
    adminAuth: {
      email: 'kamiljanovv7o7@gmail.com',
      salt,
      passwordHash: hashPassword(initialPassword, salt),
    },
  };
}

let writeQueue: Promise<void> = Promise.resolve();

async function readStore(): Promise<StoreData> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    return JSON.parse(raw) as StoreData;
  } catch {
    const initial = createInitialStore();
    await fs.writeFile(STORE_PATH, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
}

async function writeStore(data: StoreData): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), 'utf8');
  });
  await writeQueue;
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const verified = verifySessionToken(token);
  if (!verified) {
    res.status(401).json({ error: 'Session expired or invalid' });
    return;
  }
  next();
}

async function startServer() {
  await readStore();

  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Public site data (services/prices, portfolio, contacts)
  app.get('/api/site-data', async (_req, res) => {
    const store = await readStore();
    res.json({
      services: store.services,
      portfolio: store.portfolio,
      contacts: store.contacts,
    });
  });

  // Public order submission
  app.post('/api/orders', async (req, res) => {
    const { name, phone, serviceId, quantity, comment } = req.body as {
      name?: string;
      phone?: string;
      serviceId?: ServiceId;
      quantity?: number;
      comment?: string;
    };

    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    const qty = Number(quantity);

    if (trimmedName.length < 2 || trimmedName.length > 120) {
      res.status(400).json({ error: 'Invalid name' });
      return;
    }
    if (digitsOnly.length < 9 || trimmedPhone.length > 32) {
      res.status(400).json({ error: 'Invalid phone' });
      return;
    }
    if (!Number.isFinite(qty) || qty < 1 || qty > 100000) {
      res.status(400).json({ error: 'Invalid quantity' });
      return;
    }

    const store = await readStore();
    const service = store.services.find((s) => s.id === serviceId);
    if (!service) {
      res.status(400).json({ error: 'Invalid service' });
      return;
    }

    const nextNum =
      1001 +
      store.orders.reduce((max, ord) => {
        const parsed = Number(ord.id.replace('ORD-', ''));
        return Number.isFinite(parsed) && parsed >= max ? parsed + 1 : max;
      }, store.orders.length);

    const newOrder: OrderRecord = {
      id: `ORD-${nextNum}`,
      name: trimmedName,
      phone: trimmedPhone,
      serviceId: service.id,
      quantity: Math.floor(qty),
      unitPrice: service.unitPrice,
      currency: service.currency,
      totalAmount: Math.floor(qty) * service.unitPrice,
      comment: typeof comment === 'string' ? comment.trim().slice(0, 600) : '',
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    store.orders.unshift(newOrder);
    await writeStore(store);

    res.status(201).json({ order: newOrder });
  });

  // Admin Login
  app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body as { email?: string; password?: string };
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const cleanPass = typeof password === 'string' ? password : '';

    const store = await readStore();
    const emailMatches = cleanEmail === store.adminAuth.email.toLowerCase();
    const passMatches = verifyPassword(
      cleanPass,
      store.adminAuth.salt,
      store.adminAuth.passwordHash
    );

    if (!emailMatches || !passMatches) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = createSessionToken(store.adminAuth.email);
    res.json({ token, email: store.adminAuth.email });
  });

  app.get('/api/admin/session', requireAdmin, async (_req, res) => {
    const store = await readStore();
    res.json({ ok: true, email: store.adminAuth.email });
  });

  // Admin Orders CRUD
  app.get('/api/admin/orders', requireAdmin, async (_req, res) => {
    const store = await readStore();
    res.json({ orders: store.orders });
  });

  app.patch('/api/admin/orders/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body as { status?: OrderStatus };
    const validStatuses: OrderStatus[] = [
      'new',
      'in_progress',
      'completed',
      'cancelled',
    ];
    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    const store = await readStore();
    const idx = store.orders.findIndex((o) => o.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    store.orders[idx] = { ...store.orders[idx], status };
    await writeStore(store);
    res.json({ order: store.orders[idx] });
  });

  app.delete('/api/admin/orders/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const store = await readStore();
    const next = store.orders.filter((o) => o.id !== id);
    if (next.length === store.orders.length) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    store.orders = next;
    await writeStore(store);
    res.json({ ok: true });
  });

  // Admin Service Price Update
  app.put('/api/admin/services/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const { unitPrice } = req.body as { unitPrice?: number };
    const parsedPrice = Number(unitPrice);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0 || parsedPrice > 1000000) {
      res.status(400).json({ error: 'Invalid price' });
      return;
    }

    const store = await readStore();
    const idx = store.services.findIndex((s) => s.id === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }

    store.services[idx] = {
      ...store.services[idx],
      unitPrice: Math.round(parsedPrice),
    };
    await writeStore(store);
    res.json({ service: store.services[idx], services: store.services });
  });

  // Admin Portfolio Add & Delete
  app.post('/api/admin/portfolio', requireAdmin, async (req, res) => {
    const { categoryKey, year, title, client, resultMetric, summary, image } =
      req.body as {
        categoryKey?: PortfolioCategoryKey;
        year?: string;
        title?: string;
        client?: string;
        resultMetric?: string;
        summary?: string;
        image?: string;
      };

    const validCats: PortfolioCategoryKey[] = ['menu', 'vizitka', 'video', 'website'];
    if (!categoryKey || !validCats.includes(categoryKey)) {
      res.status(400).json({ error: 'Invalid category' });
      return;
    }

    const cleanTitle = typeof title === 'string' ? title.trim() : '';
    const cleanSummary = typeof summary === 'string' ? summary.trim() : '';
    if (cleanTitle.length < 2 || cleanSummary.length < 4) {
      res.status(400).json({ error: 'Title and summary are required' });
      return;
    }

    const defaultImageByCat: Record<PortfolioCategoryKey, string> = {
      menu: '/src/assets/images/portfolio_menu_cafe_1794507822370.jpg',
      vizitka: '/src/assets/images/portfolio_vizitka_brand_1794507821557.jpg',
      video: '/src/assets/images/portfolio_promo_video_1794507822632.jpg',
      website: '/src/assets/images/portfolio_web_platform_1794507822661.jpg',
    };

    const store = await readStore();
    const newItem: PortfolioRecord = {
      id: `p-${Date.now()}`,
      categoryKey,
      serviceId: categoryKey,
      year:
        typeof year === 'string' && /^\d{4}$/.test(year.trim())
          ? year.trim()
          : '2026',
      image:
        typeof image === 'string' && image.trim().length > 0
          ? image.trim()
          : defaultImageByCat[categoryKey],
      customCopy: {
        title: cleanTitle.slice(0, 120),
        client:
          typeof client === 'string' && client.trim().length > 0
            ? client.trim().slice(0, 80)
            : 'Бишкек',
        resultMetric:
          typeof resultMetric === 'string' && resultMetric.trim().length > 0
            ? resultMetric.trim().slice(0, 60)
            : '100% даяр',
        summary: cleanSummary.slice(0, 400),
      },
    };

    store.portfolio.unshift(newItem);
    await writeStore(store);
    res.status(201).json({ item: newItem, portfolio: store.portfolio });
  });

  app.delete('/api/admin/portfolio/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const store = await readStore();
    const next = store.portfolio.filter((p) => p.id !== id);
    if (next.length === store.portfolio.length) {
      res.status(404).json({ error: 'Portfolio item not found' });
      return;
    }
    store.portfolio = next;
    await writeStore(store);
    res.json({ portfolio: store.portfolio });
  });

  // Admin Contact Settings Update
  app.put('/api/admin/contacts', requireAdmin, async (req, res) => {
    const { phone, telegram, instagram, address, mapsQuery } = req.body as Partial<ContactSettings>;
    const store = await readStore();
    store.contacts = {
      phone:
        typeof phone === 'string' && phone.trim().length > 0
          ? phone.trim().slice(0, 40)
          : store.contacts.phone,
      telegram:
        typeof telegram === 'string' && telegram.trim().length > 0
          ? telegram.trim().slice(0, 60)
          : store.contacts.telegram,
      instagram:
        typeof instagram === 'string' && instagram.trim().length > 0
          ? instagram.trim().slice(0, 60)
          : store.contacts.instagram,
      address:
        typeof address === 'string' && address.trim().length > 0
          ? address.trim().slice(0, 120)
          : store.contacts.address,
      mapsQuery:
        typeof mapsQuery === 'string' && mapsQuery.trim().length > 0
          ? mapsQuery.trim().slice(0, 160)
          : store.contacts.mapsQuery,
    };
    await writeStore(store);
    res.json({ contacts: store.contacts });
  });

  // Admin Password Update
  app.put('/api/admin/password', requireAdmin, async (req, res) => {
    const { currentPassword, newPassword } = req.body as {
      currentPassword?: string;
      newPassword?: string;
    };
    const store = await readStore();
    if (
      typeof currentPassword !== 'string' ||
      !verifyPassword(
        currentPassword,
        store.adminAuth.salt,
        store.adminAuth.passwordHash
      )
    ) {
      res.status(400).json({ error: 'Current password is incorrect' });
      return;
    }
    if (typeof newPassword !== 'string' || newPassword.length < 6) {
      res.status(400).json({ error: 'New password must be at least 6 characters' });
      return;
    }
    const newSalt = crypto.randomBytes(16).toString('hex');
    store.adminAuth = {
      ...store.adminAuth,
      salt: newSalt,
      passwordHash: hashPassword(newPassword, newSalt),
    };
    await writeStore(store);
    res.json({ ok: true });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(DIST_DIR));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(DIST_DIR, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
