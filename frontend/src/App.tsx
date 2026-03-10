import { useEffect, useState } from "react";
import type { Item } from "./types/Item";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/items");
      if (!res.ok) throw new Error("Failed to fetch items");
      const data: Item[] = await res.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (newItem: Omit<Item, "id">) => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    if (!res.ok) throw new Error("Failed to add item");
    await fetchItems();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Student Management
        </h1>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Students</h2>
          <ItemList items={items} />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Student
          </h2>
          <AddItemForm onAdd={handleAdd} />
        </div>
      </div>
    </div>
  );
}

export default App;
