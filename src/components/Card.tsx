export default function Card({ children , bg = "bg-gray-300" }: { children: React.ReactNode , bg?:String }) {
  return (
    <div className={`${bg} rounded-lg p-6 shadow-md`}>
      {children}
    </div>
  );
}