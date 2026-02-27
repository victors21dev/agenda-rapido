"use client";

import { useEffect, useState } from "react";

import { getEnrichedClients } from "@/lib/clients";
import { Plus } from "lucide-react";

import ClientForm from "@/components/layout/AddClientForm";
import { DataTable } from "@/components/layout/DataTable";
import Header from "@/components/layout/Header";
import LayoutDefaultDesktop from "@/components/layout/LayoutDefaultDesktop";
import LoadingWarning from "@/components/layout/LoadingWarning";
import Modal from "@/components/layout/Modal";
import { Button } from "@/components/ui/button";

import { type Clients, type TableMeta, columns } from "./columns";

const ClientsPage = () => {
  const [data, setData] = useState<Clients[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<Clients | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        const saved = localStorage.getItem("clients_data");
        if (saved) {
          setData(JSON.parse(saved));
        } else {
          const initial = getEnrichedClients();
          setData(initial);
          localStorage.setItem("clients_data", JSON.stringify(initial));
        }
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) localStorage.setItem("clients_data", JSON.stringify(data));
  }, [data, loading]);

  const handleUpdate = (client: Clients) => {
    setData((prev) => {
      const exists = prev.find((c) => c.id === client.id);
      if (exists) {
        return prev.map((c) => (c.id === client.id ? client : c));
      }
      return [client, ...prev];
    });
    setEditingClient(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Deseja excluir este cliente permanentemente?")) {
      setData((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <LayoutDefaultDesktop>
      <Header title="Clientes" description="Gerenciamento de clientes" />

      {/* Modal de Edição */}
      {editingClient && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-background border p-6 rounded-lg w-full max-w-lg shadow-2xl relative text-foreground">
            <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
            <ClientForm initialData={editingClient} onSuccess={handleUpdate} />
            <Button
              variant="ghost"
              className="mt-4 w-full"
              onClick={() => setEditingClient(null)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      <div className="flex py-4 justify-end">
        <Modal
          trigger={
            <div className="flex items-center gap-2">
              <Plus size={18} /> Novo Cliente
            </div>
          }
        >
          {(close) => (
            <div className="bg-background p-6 rounded-lg border w-100 text-foreground">
              <h2 className="text-xl font-bold mb-4">Novo Cliente</h2>
              <ClientForm
                onSuccess={(c) => {
                  handleUpdate(c);
                  close();
                }}
              />
              <Button variant="ghost" className="w-full mt-2" onClick={close}>
                Cancelar
              </Button>
            </div>
          )}
        </Modal>
      </div>

      <div className="container mx-auto">
        {loading ? (
          <LoadingWarning description="Carregando clientes..." />
        ) : (
          <DataTable
            columns={columns}
            data={data}
            meta={
              {
                onEdit: setEditingClient,
                onDelete: handleDelete,
                updateStatus: () => {},
              } as TableMeta
            }
          />
        )}
      </div>
    </LayoutDefaultDesktop>
  );
};

export default ClientsPage;
