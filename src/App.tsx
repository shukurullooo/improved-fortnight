import { useState, type MouseEvent } from "react";

type Item = {
  id: string;
  title: string;
  description: string;
};

const App = () => {
  const [data, setData] = useState<Item[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
    event.target
    if (!formData.title.trim() || !formData.description.trim()) return;

    const newItem: Item = {
      id: new Date().toISOString(),
      title: formData.title,
      description: formData.description,
    };

    setData((prev) => [...prev, newItem]);

    setFormData({ title: "", description: "" });
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h2>GitLab</h2>

      <form onSubmit={(e) => e.preventDefault()}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        type="text"
        placeholder="Title"
      />
      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        type="text"
        placeholder="Description"
      />
      <button type="button" onClick={handleCreate}>
        Create
      </button>
      </form>

      <div>
      {data.map((item) => (
        <div key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <br />
        <button onClick={() => handleDelete(item.id)}>Delete</button>
        <hr />
        </div>
      ))}
      </div>
    </div>
  );
};

export default App;
