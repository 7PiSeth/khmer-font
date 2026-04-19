import ToggleTheme from "../common/ToggleTheme";

const Header = () => {
  return (
    <div className="min-h-[50px] h-[5vh] flex items-center justify-center sticky top-0">
      <ToggleTheme />
    </div>
  )
}

export default Header