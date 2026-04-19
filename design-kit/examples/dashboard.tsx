import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Database,
  FlaskConical,
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
} from "../compounds";
import {
  CircularIconButton,
  GlassPanel,
  type AvatarCircleColor,
} from "../primitives";

interface InvoiceSummary {
  id: string;
  name: string;
  phone: string;
  balance: string;
  avatarColor: AvatarCircleColor;
}

const invoices: InvoiceSummary[] = [
  {
    id: "inv-anna",
    name: "Anna Sterling",
    phone: "(650) 555 - 1234",
    balance: "$222.81",
    avatarColor: "magenta",
  },
  {
    id: "inv-firas",
    name: "Firas Ben Slimane",
    phone: "(415) 555 - 0198",
    balance: "$80.00",
    avatarColor: "chartreuse",
  },
  {
    id: "inv-mira",
    name: "Mira Chen",
    phone: "(212) 555 - 0112",
    balance: "$1,204.16",
    avatarColor: "blue",
  },
  {
    id: "inv-nolan",
    name: "Nolan Reed",
    phone: "(312) 555 - 0177",
    balance: "$480.00",
    avatarColor: "orange",
  },
  {
    id: "inv-sara",
    name: "Sara Vale",
    phone: "(206) 555 - 0133",
    balance: "$96.40",
    avatarColor: "cyan",
  },
];

export function DashboardExample() {
  const [activeTab, setActiveTab] = useState("customers");
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedId, setSelectedId] = useState("inv-firas");

  return (
    <main className="min-h-screen bg-[#0A0B0A] p-6 font-body text-white">
      <div className="mx-auto flex min-h-[820px] max-w-[1280px] flex-col gap-6 overflow-hidden rounded-[32px] bg-[#0F110F] p-5 shadow-2xl">
        <TopNav
          brand={
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-white/10">
                <span className="text-xs font-bold text-white">S</span>
              </div>
              <span className="text-sm font-semibold text-white">salesforce</span>
            </div>
          }
          tabs={[
            { id: "overview", label: "Overview" },
            { id: "customers", label: "Customers" },
            { id: "marketing", label: "Marketing" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          navAriaLabel="Main navigation"
          utilities={
            <>
              <CircularIconButton icon={<Send />} aria-label="Share" />
              <CircularIconButton icon={<Bell />} aria-label="Notifications" />
            </>
          }
          userName="Firas"
          userAvatarColor="chartreuse"
          onUserClick={() => undefined}
        />

        <section className="flex items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-3">
            <CircularIconButton
              size="lg"
              icon={<ArrowLeft />}
              aria-label="Go back"
            />
            <div>
              <p className="text-sm text-white/50">Customers & leads</p>
              <h1 className="font-display text-[44px] font-bold leading-none tracking-tight">
                Customers
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <IconToolbar aria-label="Page actions">
              <CircularIconButton icon={<FlaskConical />} aria-label="Lab" />
              <CircularIconButton icon={<Send />} aria-label="Send" />
              <CircularIconButton icon={<Calendar />} aria-label="Calendar" />
              <CircularIconButton icon={<Database />} aria-label="Database" />
              <CircularIconButton icon={<Phone />} aria-label="Call" />
              <CircularIconButton icon={<Star />} aria-label="Favorite" />
              <CircularIconButton icon={<Share2 />} aria-label="Share" />
              <CircularIconButton icon={<Search />} aria-label="Search" />
            </IconToolbar>
            <PrimaryCTA
              label="New Customer"
              icon={<Plus />}
              aria-label="Create new customer"
            />
          </div>
        </section>

        <KPIStrip
          barAriaLabel="Customer financial composition across five categories"
          metrics={[
            { id: "estimates", value: "$0,00", label: "0 estimates" },
            { id: "unbilled", value: "$0,00", label: "Unbilled income" },
            { id: "overdue", value: "$600,00", label: "2 overdue invoices" },
            { id: "open", value: "$600,00", label: "Open balances" },
            { id: "other", value: "$0,00", label: "Other activity" },
          ]}
          segments={[
            { value: 120, color: "blue", label: "Estimates" },
            { value: 80, color: "magenta", label: "Unbilled income" },
            { value: 600, color: "chartreuse", label: "Overdue invoices" },
            { value: 420, color: "silver", label: "Open balances" },
            { value: 60, color: "orange", label: "Other" },
          ]}
          className="px-2"
        />

        <div className="grid flex-1 grid-cols-[minmax(0,1.35fr)_minmax(420px,0.9fr)] gap-5">
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
                      All Invoices
                    </h2>
                    <CircularIconButton
                      variant="light"
                      size="sm"
                      icon={<Plus />}
                      aria-label="Add invoice"
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
                    selectedAction="Create invoice"
                    isSelected={invoice.id === selectedId}
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
              recordId="INV-00120"
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

            <div className="grid grid-cols-[1fr_auto] gap-8">
              <CustomerIdentityBlock
                name="Silker"
                nameAs="h2"
                avatarColor="chartreuse"
                avatarBadge={
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#2D7CF6]">
                    <Star className="size-3 fill-white text-white" />
                  </span>
                }
                address={["1561 Appleview Town,", "Bakers Street,", "Chicago, U.S.A"]}
                billToLabel="Bill To:"
                billToValue={
                  <a
                    href="#anna-sterling"
                    className="text-white/80 underline underline-offset-2 hover:text-white"
                  >
                    Anna Sterling
                  </a>
                }
              />

              <MetadataStack
                items={[
                  { id: "date", label: "Invoice Date:", value: "09/08/2018" },
                  { id: "terms", label: "Terms:", value: "Net 15" },
                  { id: "due", label: "Due Date:", value: "24/08/2018" },
                ]}
              />
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <MiniLineItemsTable
                items={[
                  {
                    id: "item-1",
                    number: 1,
                    description: "Onyx Vase",
                    qty: "2.00",
                    rate: "20.00",
                    amount: "40.00",
                  },
                  {
                    id: "item-2",
                    number: 2,
                    description: "Rosewood Frame",
                    qty: "1.00",
                    rate: "40.00",
                    amount: "40.00",
                  },
                ]}
              />

              <TotalsGroup
                totals={[
                  { id: "subtotal", label: "Sub Total", value: "$80.00" },
                  { id: "total", label: "Total", value: "$80.00" },
                  { id: "balance", label: "Balance Due", value: "$80.00" },
                ]}
              />
            </div>
          </GlassPanel>
        </div>
      </div>
    </main>
  );
}

export default DashboardExample;
