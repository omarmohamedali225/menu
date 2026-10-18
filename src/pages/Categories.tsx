import TableDashboard from "@/components/dashboard/TableDashboard";

export default function Categories() {
  return (
    <div className="p-4 space-y-3">
      <h1>اهلا بيك يا عمر</h1>
      <h2 className="text-sm font-light">اداره اسهل لنظام يفهمك</h2>
      {/* shorts */}
      <TableDashboard />
    </div>
  );
}
