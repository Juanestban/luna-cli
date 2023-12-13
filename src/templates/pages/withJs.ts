type Props = { name: string };

export const withJs = ({ name }: Props) => {
  return `export default function ${name}() {
  return (
    <section>
      <h1>page: ${name}</h1>
    </section>
  )
}
`;
};

export const indexWithJs = ({
  name,
}: Props) => `export { default as ${name} } from './${name}';
`;
