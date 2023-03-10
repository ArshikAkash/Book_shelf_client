import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { UserContext } from '../../App';
import { handleSignOut } from '../Login/LoginManager';

const navigation = [
    { name: 'Home', to: '/', current: true },
    { name: 'Orders', to: '/order', href: '#', current: false },
    { name: 'Deals', current: false },
    { name: 'Admin', to: '/admin', current: false },
    { name: 'Login', to: '/login', current: false },
];
const imgSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbaaJBBe1LCWmR7Eu8GaQy5RlN1k6V5nmiFmSxVPCvv3GdDoAjq_nuD8TVGuVCkgHPAwc&usqp=CAU';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Nav = () => {
    const [loggedInUser] = useContext(UserContext);
    const [user, setUser] = useContext(UserContext);
    console.log('from header', user);
    const signOut = () => {
        handleSignOut().then((res) => {
            setUser(res);
        });
    };

    return (
        <div>
            <Disclosure as='nav' className='bg-gray-800'>
                {({ open }) => (
                    <>
                        <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
                            <div className='relative flex items-center justify-between h-16'>
                                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                                        <span className='sr-only'>
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XIcon
                                                className='block h-6 w-6'
                                                aria-hidden='true'
                                            />
                                        ) : (
                                            <MenuIcon
                                                className='block h-6 w-6'
                                                aria-hidden='true'
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                                    <div className='flex-shrink-0 flex items-center'>
                                        <img
                                            className='block lg:hidden h-8 w-auto'
                                            src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                                            alt='BOOKSHELF'
                                        />
                                        <img
                                            className='hidden lg:block h-8 w-auto'
                                            src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                                            alt='BOOKSHELF'
                                        />
                                    </div>
                                    <div className='hidden sm:block sm:ml-6'>
                                        <div className='flex space-x-4'>
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? 'page'
                                                            : undefined
                                                    }
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                    <button className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                                        <span className='sr-only '>
                                            View notifications
                                        </span>
                                        <h1 class='font-bold font-roboto mobile:hidden md:block'>
                                            {loggedInUser.name}
                                        </h1>
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as='div' className='ml-3 relative'>
                                        {({ open }) => (
                                            <>
                                                <div>
                                                    <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                                                        <span className='sr-only'>
                                                            Open user menu
                                                        </span>
                                                        <img
                                                            className='h-10 w-10 rounded-full'
                                                            src={
                                                                loggedInUser.photo ||
                                                                imgSrc
                                                            }
                                                            alt=''
                                                        />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    enter='transition ease-out duration-100'
                                                    enterFrom='transform opacity-0 scale-95'
                                                    enterTo='transform opacity-100 scale-100'
                                                    leave='transition ease-in duration-75'
                                                    leaveFrom='transform opacity-100 scale-100'
                                                    leaveTo='transform opacity-0 scale-95'
                                                >
                                                    <Menu.Items
                                                        static
                                                        className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                                                    >
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link
                                                                    onClick={
                                                                        signOut
                                                                    }
                                                                    href='#'
                                                                    className={classNames(
                                                                        active
                                                                            ? 'bg-gray-100'
                                                                            : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Sign Out
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </>
                                        )}
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className='sm:hidden'>
                            <div className='px-2 pt-2 pb-3 space-y-1'>
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={
                                            item.current ? 'page' : undefined
                                        }
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

export default Nav;
