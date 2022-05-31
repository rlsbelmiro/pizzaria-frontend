import Head from "next/head";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Header from '../../components/Header';
import { api } from "../../services/apiClient";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss';

export default function Categories() {
    const [name, setName] = useState('');
    async function handleSave(e: FormEvent) {
        e.preventDefault();

        if(!name) {
            toast.warning('Preencha os dados');
            return;
        }

        api.post('/category',{
            name
        }).then(result => {
            toast.success('Categoria cadastrada com sucesso!');
        }).catch(err => {
            const msg = err?.response?.data?.error ? err?.response?.data?.error : 'Erro ao cadastrar categoria';
            toast.error(msg); 
        });
        setName('');
    }
    return (
        <>
            <Head>
                <title>Nova categoria</title>
            </Head>
            <Header active={true} />
            <main className={styles.container}>
                <h1>Cadastrar categorias</h1>
                <form onSubmit={(e) => handleSave(e)} className={styles.form}>
                    <input type="text" placeholder="Digite o nome da categoria"
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className={styles.buttonAdd} type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return  {
      props: {}
    }
});