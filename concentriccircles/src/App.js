import { Concentric } from "./Concentric";
import "./styles.css";

export default function App() {
  return (
    <Concentric
      radiusArray={[
        { r: 50, color: "red" },
        { r: 100, color: "rgb(242, 125, 145)" },
        { r: 25, color: "green" },
        { r: 10, color: "red" },
        { r: 125, color: "blue" },
        { r: 150, color: "yellow" },
        { r: 75, color: "green" },
      ]}
    />
  );
}
