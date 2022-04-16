import { useQuery } from "react-query";
import axiosInstance from "../axios";


type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

type GetUsersResponse = {
  users: User[],
  totalCount: number;
}


async function getUsers(page: number): Promise<GetUsersResponse> {
  const response = await axiosInstance.get('/users', {
    params: {
      page,
    }
  });
  const totalCount = Number(response.headers['x-total-count']);

  const users = response.data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }));

  return {
    users,
    totalCount,
  }

}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10
  })
} 