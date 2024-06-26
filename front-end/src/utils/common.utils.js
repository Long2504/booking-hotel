function generateRoute(AppRoutes, Route) {
    return AppRoutes.map((r, i) => {
        let element = undefined;
        if (r.element) {
            element = r.element;
        }
        if (r.children) {
            return (
                <Route key={i} {...r} element={element}>
                    {generateRoute(r.children, Route)}
                </Route>
            );
        }
        return <Route key={i} {...r} element={element} />;
    });
}

export { generateRoute };
