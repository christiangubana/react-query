import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // to fetch fetch data & change data

const POSTS = [
  { id: 1, title: "Desmond Post 1" },
  { id: 2, title: "HP losange Post 2" },
];

const App = () => {
  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

  return (
    <>
      <div className="App">
        <h1>TanStack Query</h1>
        {postQuery.data.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
        <button disabled={newPostMutation.isLoading} onClick={() => newPostMutation.mutate("New Post")}>
          Add New
        </button>
      </div>
    </>
  );
};

const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default App;
