import {ClipLoader} from "react-spinners";
interface SpinnerProps {
  loading: boolean;
}

const override = {
  display: "block",
  margin: "100px auto",
};

export function Spinner({ loading }: SpinnerProps) {
  return (
    <ClipLoader
      color="#4338ca" // Beautiful Indigo color to match your theme
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
}