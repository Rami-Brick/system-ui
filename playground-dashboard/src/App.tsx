import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Database,
  FileText,
  LayoutGrid,
  List,
  Paperclip,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Send,
  Share2,
  Sparkles,
  Star,
  Upload,
} from "lucide-react";
import {
  CustomerIdentityBlock,
  IconToolbar,
  InvoiceDetailHeader,
  InvoiceRow,
  KPIStrip,
  MetadataStack,
  MiniLineItemsTable,
  PanelHeader,
  PrimaryCTA,
  SegmentedToggle,
  TopNav,
  TotalsGroup,
} from "../../design-kit/compounds";
import {
  CircularIconButton,
  GlassPanel,
  type AvatarCircleColor,
} from "../../design-kit/primitives";

interface LineItem {
  id: string;
  number: number;
  description: string;
  qty: string;
  rate: string;
  amount: string;
}

interface InvoiceRecord {
  id: string;
  recordNumber: string;
  name: string;
  phone: string;
  balance: string;
  avatarColor: AvatarCircleColor;
  address: string[];
  invoiceDate: string;
  terms: string;
  dueDate: string;
  lineItems: LineItem[];
  totals: [
    { id: string; label: string; value: string },
    { id: string; label: string; value: string },
    { id: string; label: string; value: string },
  ];
}

const invoices: InvoiceRecord[] = [
  {
    id: "rec-lyra",
    recordNumber: "INV-2041",
    name: "Lyra Okafor",
    phone: "(415) 555 - 0412",
    balance: "$3,840.00",
    avatarColor: "magenta",
    address: ["221 Folsom St,", "Suite 4B,", "San Francisco, CA"],
    invoiceDate: "03/28/2026",
    terms: "Net 30",
    dueDate: "04/27/2026",
    lineItems: [
      { id: "li-1", number: 1, description: "Quarterly retainer", qty: "1.00", rate: "3,200.00", amount: "3,200.00" },
      { id: "li-2", number: 2, description: "Strategy workshop", qty: "2.00", rate: "320.00", amount: "640.00" },
    ],
    totals: [
      { id: "subtotal", label: "Sub Total", value: "$3,840.00" },
      { id: "total", label: "Total", value: "$3,840.00" },
      { id: "balance", label: "Balance Due", value: "$3,840.00" },
    ],
  },
  {
    id: "rec-mateo",
    recordNumber: "INV-2042",
    name: "Mateo Vargas",
    phone: "(312) 555 - 0187",
    balance: "$1,204.16",
    avatarColor: "blue",
    address: ["88 W Randolph,", "Loft 3,", "Chicago, IL"],
    invoiceDate: "04/01/2026",
    terms: "Net 15",
    dueDate: "04/16/2026",
    lineItems: [
      { id: "li-1", number: 1, description: "Platform setup", qty: "1.00", rate: "900.00", amount: "900.00" },
      { id: "li-2", number: 2, description: "Integration hours", qty: "4.00", rate: "76.04", amount: "304.16" },
    ],
    totals: [
      { id: "subtotal", label: "Sub Total", value: "$1,204.16" },
      { id: "total", label: "Total", value: "$1,204.16" },
      { id: "balance", label: "Balance Due", value: "$1,204.16" },
    ],
  },
  {
    id: "rec-soraya",
    recordNumber: "INV-2043",
    name: "Soraya Demir",
    phone: "(206) 555 - 0133",
    balance: "$612.40",
    avatarColor: "cyan",
    address: ["1800 Westlake Ave N,", "Floor 2,", "Seattle, WA"],
    invoiceDate: "04/04/2026",
    terms: "Net 15",
    dueDate: "04/19/2026",
    lineItems: [
      { id: "li-1", number: 1, description: "Research sprint", qty: "1.00", rate: "500.00", amount: "500.00" },
      { id: "li-2", number: 2, description: "Report revision", qty: "1.00", rate: "112.40", amount: "112.40" },
    ],
    totals: [
      { id: "subtotal", label: "Sub Total", value: "$612.40" },
      { id: "total", label: "Total", value: "$612.40" },
      { id: "balance", label: "Balance Due", value: "$612.40" },
    ],
  },
  {
    id: "rec-idris",
    recordNumber: "INV-2044",
    name: "Idris Bellamy",
    phone: "(646) 555 - 0291",
    balance: "$2,480.00",
    avatarColor: "orange",
    address: ["34 Greene St,", "Loft 6,", "New York, NY"],
    invoiceDate: "04/06/2026",
    terms: "Net 30",
    dueDate: "05/06/2026",
    lineItems: [
      { id: "li-1", number: 1, description: "Brand system audit", qty: "1.00", rate: "1,800.00", amount: "1,800.00" },
      { id: "li-2", number: 2, description: "Creative direction", qty: "8.00", rate: "85.00", amount: "680.00" },
    ],
    totals: [
      { id: "subtotal", label: "Sub Total", value: "$2,480.00" },
      { id: "total", label: "Total", value: "$2,480.00" },
      { id: "balance", label: "Balance Due", value: "$2,480.00" },
    ],
  },
  {
    id: "rec-hana",
    recordNumber: "INV-2045",
    name: "Hana Voss",
    phone: "(503) 555 - 0156",
    balance: "$96.40",
    avatarColor: "chartreuse",
    address: ["1200 NW Lovejoy,", "Studio 9,", "Portland, OR"],
    invoiceDate: "04/09/2026",
    terms: "Due on receipt",
    dueDate: "04/09/2026",
    lineItems: [
      { id: "li-1", number: 1, description: "Copy edits", qty: "1.00", rate: "96.40", amount: "96.40" },
    ],
    totals: [
      { id: "subtotal", label: "Sub Total", value: "$96.40" },
      { id: "total", label: "Total", value: "$96.40" },
      { id: "balance", label: "Balance Due", value: "$96.40" },
    ],
  },
  {
    id: "rec-ren",
    recordNumber: "INV-2046",
    name: "Ren Takahashi",
    phone: "(212) 555 - 0411",
    balance: "$540.00",
    avatarColor: "silver",
    address: ["60 Thompson St,", "Apt 12,", "New York, NY"],
    invoiceDate: "04/12/2026",
    terms: "Net 7",
    dueDate: "04/19/2026",
    lineItems: [
      { id: "li-1", number: 1, description: "Motion study", qty: "3.00", rate: "140.00", amount: "420.00" },
      { id: "li-2", number: 2, description: "Asset handoff", qty: "1.00", rate: "120.00", amount: "120.00" },
    ],
    totals: [
      { id: "subtotal", label: "Sub Total", value: "$540.00" },
      { id: "total", label: "Total", value: "$540.00" },
      { id: "balance", label: "Balance Due", value: "$540.00" },
    ],
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("invoices");
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedId, setSelectedId] = useState<string>(invoices[0].id);

  const selected = useMemo(
    () => invoices.find((i) => i.id === selectedId) ?? invoices[0],
    [selectedId],
  );

  return (
    <main className="min-h-screen bg-[#0A0B0A] p-4 font-body text-white sm:p-6">
      <div className="mx-auto flex min-h-[820px] max-w-[1280px] flex-col gap-6 overflow-hidden rounded-[32px] bg-[#0F110F] p-4 shadow-2xl sm:p-5">
        <TopNav
          brand={
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-white/10">
                <span className="text-xs font-bold text-white">R</span>
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                rampline
              </span>
            </div>
          }
          tabs={[
            { id: "revenue", label: "Revenue" },
            { id: "invoices", label: "Invoices" },
            { id: "customers", label: "Customers" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          navAriaLabel="Main navigation"
          utilities={
            <>
              <CircularIconButton icon={<Search />} aria-label="Search" />
              <CircularIconButton icon={<Bell />} aria-label="Notifications" />
            </>
          }
          userName="Rami"
          userAvatarColor="chartreuse"
          onUserClick={() => undefined}
        />

        <section className="flex flex-wrap items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-3">
            <CircularIconButton
              size="lg"
              icon={<ArrowLeft />}
              aria-label="Go back"
            />
            <div>
              <p className="text-sm text-white/50">Revenue command center</p>
              <h1 className="font-display text-[36px] font-bold leading-none tracking-tight sm:text-[44px]">
                April receivables
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <IconToolbar aria-label="Page actions">
              <CircularIconButton icon={<Sparkles />} aria-label="Insights" />
              <CircularIconButton icon={<Send />} aria-label="Send" />
              <CircularIconButton icon={<Calendar />} aria-label="Calendar" />
              <CircularIconButton icon={<Database />} aria-label="Database" />
              <CircularIconButton icon={<Phone />} aria-label="Call" />
              <CircularIconButton icon={<Share2 />} aria-label="Share" />
              <CircularIconButton icon={<FileText />} aria-label="Reports" />
            </IconToolbar>
            <PrimaryCTA
              label="Create invoice"
              icon={<Plus />}
              aria-label="Create new invoice"
            />
          </div>
        </section>

        <KPIStrip
          className="px-2"
          barAriaLabel="Receivables composition across five categories"
          metrics={[
            { id: "collected", value: "$48,210", label: "Collected this month" },
            { id: "outstanding", value: "$9,572", label: "Outstanding" },
            { id: "overdue", value: "$2,144", label: "3 overdue invoices" },
            { id: "drafts", value: "$3,400", label: "Pending drafts" },
            { id: "refunds", value: "$180", label: "Refunds issued" },
          ]}
          segments={[
            { value: 48210, color: "blue", label: "Collected" },
            { value: 9572, color: "silver", label: "Outstanding" },
            { value: 2144, color: "orange", label: "Overdue" },
            { value: 3400, color: "magenta", label: "Drafts" },
            { value: 180, color: "cyan", label: "Refunds" },
          ]}
        />

        <div className="grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(420px,0.9fr)]">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[40px] bg-[rgba(154,255,90,0.10)] blur-3xl"
            />
            <GlassPanel className="relative flex h-full flex-col gap-5 p-5">
              <PanelHeader
                leading={
                  <>
                    <h2 className="text-[17px] font-semibold leading-snug text-white">
                      All receivables
                    </h2>
                    <CircularIconButton
                      variant="light"
                      size="sm"
                      icon={<Plus />}
                      aria-label="Add receivable"
                    />
                  </>
                }
                center={
                  <SegmentedToggle
                    aria-label="View mode"
                    value={view}
                    onChange={(next) => setView(next as "list" | "grid")}
                    options={[
                      { value: "list", icon: <List />, label: "List view" },
                      { value: "grid", icon: <LayoutGrid />, label: "Grid view" },
                    ]}
                  />
                }
                trailing={
                  <IconToolbar density="tight" aria-label="List management actions">
                    <CircularIconButton
                      variant="light"
                      icon={<RefreshCw />}
                      aria-label="Refresh list"
                    />
                    <CircularIconButton
                      variant="light"
                      icon={<Upload />}
                      aria-label="Upload invoices"
                    />
                    <CircularIconButton
                      variant="light"
                      icon={<Pencil />}
                      aria-label="Edit list"
                    />
                  </IconToolbar>
                }
              />

              <div className="flex flex-col gap-1">
                {invoices.map((invoice) => (
                  <InvoiceRow
                    key={invoice.id}
                    name={invoice.name}
                    phone={invoice.phone}
                    balance={invoice.balance}
                    avatarColor={invoice.avatarColor}
                    defaultAction="Receive payment"
                    selectedAction="Send reminder"
                    isSelected={invoice.id === selected.id}
                    onOpen={() => setSelectedId(invoice.id)}
                    onAction={() => undefined}
                    onMore={() => undefined}
                  />
                ))}
              </div>
            </GlassPanel>
          </div>

          <GlassPanel variant="raised" className="flex flex-col gap-6 p-6">
            <InvoiceDetailHeader
              recordId={selected.recordNumber}
              actions={
                <>
                  <CircularIconButton icon={<Paperclip />} aria-label="Attach file" />
                  <CircularIconButton icon={<Send />} aria-label="Send invoice" />
                  <CircularIconButton icon={<Upload />} aria-label="Upload document" />
                  <CircularIconButton icon={<Pencil />} aria-label="Edit invoice" />
                </>
              }
              onMore={() => undefined}
              onClose={() => undefined}
            />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto]">
              <CustomerIdentityBlock
                name={selected.name}
                nameAs="h2"
                avatarColor={selected.avatarColor}
                avatarBadge={
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#2D7CF6]">
                    <Star className="size-3 fill-white text-white" />
                  </span>
                }
                address={selected.address}
                billToLabel="Bill To:"
                billToValue={
                  <a
                    href={`#${selected.id}`}
                    className="text-white/80 underline underline-offset-2 hover:text-white"
                  >
                    {selected.name}
                  </a>
                }
              />

              <MetadataStack
                items={[
                  { id: "date", label: "Invoice Date:", value: selected.invoiceDate },
                  { id: "terms", label: "Terms:", value: selected.terms },
                  { id: "due", label: "Due Date:", value: selected.dueDate },
                ]}
              />
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <MiniLineItemsTable items={selected.lineItems} />
              <TotalsGroup totals={selected.totals} />
            </div>
          </GlassPanel>
        </div>
      </div>
    </main>
  );
}
