import React, { useEffect, useRef } from 'react'
import { mount } from 'neighborhood/NeighborhoodApp'
import PageHeader from '../components/PageHeader';
import { ContentPaper } from '../assets/theme/dafneStyles';
import { Container } from '@mui/system';

const NeigborhoodApp = () => {
    const ref = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (ref.current) {
            mount(ref.current);
            // add an empty dependency array to only call this function when the marketing object is first rendered to the screen
        }
    }, []);

    // Add an event listener to capture the jobCreated event
    // Add an event listener to capture the jobCreated event
    useEffect(() => {
        const handleJobCreated = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail) {
                console.log('Job Created:', customEvent.detail, customEvent.detail);
            }
        };

        window.addEventListener('jobCreated', handleJobCreated);

        return () => {
            // Clean up the event listener when the component unmounts
            window.removeEventListener('jobCreated', handleJobCreated);
        };
    }, []);


    return (
        <>
            <PageHeader title='Neighborhood Generation'
                subtitle='Generate a synthetic city plan' />
            <ContentPaper>
                <Container>
                    <div ref={ref}></div>;
                </Container>
            </ContentPaper>


        </>
    )

}

export default NeigborhoodApp