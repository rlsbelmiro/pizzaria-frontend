import Head from 'next/head';
import Image from 'next/image';

import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/logo.svg';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Pizzaria" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form>
          <Input placeholder='Informe seu nome' />
            <Input placeholder='Digite seu email' />
            <Input placeholder='Sua senha' type="password" />
            <Button type="button" loading={false}>
              Cadastrar
            </Button>
            <Link href="/">
              <a className={styles.text}>
                Já possui uma conta? Faça o login
              </a>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}
