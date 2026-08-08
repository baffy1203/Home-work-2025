function ClientCard({ client }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-semibold">
            {client.name}
          </h2>

          <p className="text-gray-500 mt-2">
            📞 {client.phone || "Телефон не вказаний"}
          </p>

          <div className="mt-4">

            {client.visits >= 10 ? (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-xl">
                VIP
              </span>
            ) : client.visits >= 3 ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl">
                Постійний клієнт
              </span>
            ) : (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl">
                Новий клієнт
              </span>
            )}

          </div>

        </div>

        <div className="text-right">

          <div className="font-semibold">
            ⭐ {client.visits} візитів
          </div>

          <div className="mt-2 text-[#7c5569] font-semibold">
            💰 {client.totalSpent} грн
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">

        <div className="bg-[#f7f3f1] rounded-2xl p-4">
          <p className="text-sm text-gray-500">
            Перший візит
          </p>

          <p className="font-semibold mt-1">
            {client.firstVisit}
          </p>
        </div>

        <div className="bg-[#f7f3f1] rounded-2xl p-4">
          <p className="text-sm text-gray-500">
            Останній візит
          </p>

          <p className="font-semibold mt-1">
            {client.lastVisit}
          </p>
        </div>

      </div>

    </div>
  );
}

export default ClientCard;