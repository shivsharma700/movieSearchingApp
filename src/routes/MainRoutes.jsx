import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home/Home";
import React, {Suspense} from "react";

// lazy components
const MovieDetails = React.lazy(() => import('../pages/MovieDetails/MovieDetail'));
const Error = React.lazy(() => import('../pages/Error'))
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/errorFallback/ErrorFallback";

function MainRoutes (){
    return (
        <>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/movie/:id" element={(
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={()=>{}}>
                <Suspense fallback={<h1>Loading....</h1>}>
                <MovieDetails/>
                </Suspense>
              </ErrorBoundary>
            )} />
            <Route path="*" element={<Error/>} />
          </Routes>
        </>
    )
}

export default MainRoutes;