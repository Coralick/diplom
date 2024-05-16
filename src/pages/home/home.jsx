import React, { useContext } from 'react';
import Table from '../../components/Table';
import { DataContext } from '../Layout'

function Home() {
    const { data } = useContext(DataContext)

    return (
        <main>

            <div className="main_block">
                <div className="table_container">
                    {data['tables'] && data['tables'].map((item) => (

                        <Table itemProp={item} />

                    ))}
                </div>

            </div>

        </main>
    );
}

export default Home;