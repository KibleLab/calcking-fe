export default function NavBar() {
  return (
    <header className='flex justify-between bg-white px-12 shadow-md'>
      <div className='flex h-[150px] w-[1920px] items-center'>
        <img
          src='/imgs/logo.svg'
          alt='Logo'
        />
      </div>
      <div className='flex'>
        <button>
          <img
            src='/imgs/user-icon.svg'
            alt='User'
          />
        </button>
        <button>
          <img
            src='/imgs/menu-icon.svg'
            alt='Menu'
          />
        </button>
      </div>
    </header>
  );
}
