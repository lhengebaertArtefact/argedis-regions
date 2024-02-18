import Link from "next/link";

export default function LangChoice({ params }: { params: { region: any } }) {
  const { region } = params;

  return (
    <div>
      <div> Choisissez votre langue</div>
      <Link href={`/fr/${region}/producersmap`}>FR</Link>
      <Link href={`/en/${region}/producersmap`}>EN</Link>
    </div>
  );
}
