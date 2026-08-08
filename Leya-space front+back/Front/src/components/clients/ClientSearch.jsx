function ClientSearch({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Пошук клієнта..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-white border rounded-2xl p-4 mb-6 outline-none focus:ring-2 focus:ring-[#7c5569]"
    />
  );
}

export default ClientSearch;