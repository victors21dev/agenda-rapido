import { DATA_GENDER } from "@/data/gender";
import { MOCK_CLIENTS } from "@/mocks/clients";
import { type Clients } from "@/pages/Clients/columns";

export function getEnrichedClients(): Clients[] {
  // Cópia e ordenação por createdAt (ASC)
  const sortedClients = [...MOCK_CLIENTS].sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  );

  // Mapeamento e enriquecimento dos dados com o nome do gênero
  return sortedClients.map((client) => {
    const genderInfo = DATA_GENDER.find((g) => g.id === client.gender);

    return {
      ...client,
      genderName: genderInfo ? genderInfo.name : "Não informado",
    };
  }) as Clients[];
}
