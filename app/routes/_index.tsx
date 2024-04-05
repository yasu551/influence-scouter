import type { MetaFunction } from "@remix-run/node";
import Counter from "components/Counter";
import InfluenceNetwork from "components/InfluenceNetwork";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <InfluenceNetwork />
  );
}
