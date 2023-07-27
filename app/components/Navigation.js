import { ImStatsDots } from "react-icons/im";
function Nav() {
  return (
    <header className="container max-w-4xl px-6 py-6 mx-auto">
      <div className="flex items-center justify-between">
        {/* User Information */}
        <div className="flex items-center gap-4">
          <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
            {/* img */}
            <img
              className="object-cover w-full h-full"
              src="./assets/images/profile.jpg"
              alt="profile pic"
            />
          </div>
          {/* name */}
          <small>Hi, Hassan</small>
        </div>

        {/* Right Side of Our Nav */}
        <nav className="flex items-center gap-4">
          <div>
            <ImStatsDots className="text-2xl" />
          </div>
          <div>
            <button className="btn btn-danger">Sign out</button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
