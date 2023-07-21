import('./bootstrap').then(
    ({ mount }) => {
        const localRoot = document.getElementById('_dafne-dev-root');

        mount({
            mountPoint: localRoot!,
            routingStrategy: 'browser',
        })
    });