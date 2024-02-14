export default function Layout({
  children,
  slot1,
  slot2,
}: {
  children: React.ReactNode
  slot1: React.ReactNode
  slot2: React.ReactNode
}) {
  return (
    <>
      {children}
      {slot1}
      {slot2}
    </>
  )
}