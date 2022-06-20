import { v4 as uuid } from 'uuid';

export const projectsList = [
    {
        project_Id: uuid(),
        name: "Project 1 ",
        created_at: '27/03/2019',
        updated_at: '27/03/2019',
        deleted_at: '27/03/2019',
        brief: 'Org1 works in dash and dash. It aims at dash and dash... we are looking for dash and dash',
        problem_statement: "Problem statement Problem statement Problem statement Problem statement ",
        domain: 'https://www.google.com',
        status: "Accepted"
    },
    {
        project_Id: uuid(),
        name: "Project 2",
        created_at: '27/03/2019',
        updated_at: '27/03/2019',
        deleted_at: '27/03/2019',
        brief: 'Org1 works in dash and dash. It aims at dash and dash... we are looking for dash and dash',
        problem_statement: "Problem statement Problem statement Problem statement Problem statement ",
        domain: 'https://www.google.com',
        status: "Completed"
    }
]