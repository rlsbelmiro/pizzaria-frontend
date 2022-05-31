import Link from 'next/link';
import styles from './styles.module.scss';
import { FiLogOut } from 'react-icons/fi';
import logoImg from '../../../public/logo.svg';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

interface HeaderProps {
    active?: boolean;
}

export default function Header({ active }: HeaderProps) {
    const { signOut } = useContext(AuthContext);
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image src={logoImg} height="60" width="190" alt="Dashboard" />
                </Link>
                <nav className={styles.menuNav}>
                    <Link href="categories">
                        <a className={active ? styles.active : ''}>Categorias</a>
                    </Link>

                    <Link href="products">
                        <a>Produtos</a>
                    </Link>

                    <button onClick={() => signOut()}>
                        <FiLogOut color="#fff" size={24} />
                    </button>
                </nav>
            </div>
        </header>
    )
}