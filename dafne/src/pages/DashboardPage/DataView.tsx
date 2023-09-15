import React from 'react'
import { useFetchDatasetsQuery } from '../../redux/apiGatewaySlice';

const DataView = () => {
    const { data, error, isLoading } = useFetchDatasetsQuery({});

    let content;

    if (isLoading) {
        return <p>"Loading..."</p>;
    }
    if (error) {
        return <p>Error fetching a donations</p>;
    }

    console.log(data[0].publicData);

    return (
        <div>DataView</div>
    )
}

export default DataView