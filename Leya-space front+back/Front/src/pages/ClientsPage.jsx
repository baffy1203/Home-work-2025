import { useMemo, useState } from "react";

import ClientSearch from "../components/clients/ClientSearch";
import ClientCard from "../components/clients/ClientCard";
import ClientHistory from "../components/clients/ClientHistory";

function ClientsPage() {
  const [search, setSearch] = useState("");

  const appointments = JSON.parse(
    localStorage.getItem("appointments") || "[]"
  );

  const clients = useMemo(() => {
    const clientsMap = {};

    appointments.forEach((appointment) => {
      const key =
        appointment.phone || appointment.client;

      if (!clientsMap[key]) {
        clientsMap[key] = {
          name: appointment.client,
          phone: appointment.phone || "",
          visits: 0,
          totalSpent: 0,
          firstVisit: appointment.date,
          lastVisit: appointment.date,
        };
      }

      clientsMap[key].visits += 1;

      clientsMap[key].totalSpent += Number(
        appointment.price || 0
      );

      if (
        appointment.date <
        clientsMap[key].firstVisit
      ) {
        clientsMap[key].firstVisit =
          appointment.date;
      }

      if (
        appointment.date >
        clientsMap[key].lastVisit
      ) {
        clientsMap[key].lastVisit =
          appointment.date;
      }
    });

    return Object.values(clientsMap);
  }, [appointments]);

  const filteredClients = clients.filter(
    (client) =>
      client.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      client.phone.includes(search)
  );

  return (
    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Клієнти
      </h1>

      <ClientSearch
        search={search}
        setSearch={setSearch}
      />

      <div className="flex flex-col gap-6">

        {filteredClients.map((client) => (
          <div key={client.phone + client.name}>

            <ClientCard client={client} />

            <ClientHistory
              appointments={appointments}
              client={client}
            />

          </div>
        ))}

      </div>

    </div>
  );
}

export default ClientsPage;