import React from 'react';
import { Route } from 'react-router-dom';

import QuestionnaireList from "./components/QuestionnaireList";

const BaseRouter = ()=>{
    <div>
        <Route exact path='/' component={QuestionnaireList} />
        <Route exact path='/:qid' component={QuestionnaireList} />
    </div>
};
export default BaseRouter;