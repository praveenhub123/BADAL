import { gql } from "@apollo/client";

export const LOGIN = gql`
    query(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email
            password: $password
        ) {
            userId
            token
            tokenExpiration
            teamId
            userRole
        }
    }
`

export const GET_ALL_COMPANIES = gql`
    query {
        GetCompany {
            _id
            name
            email
            address
            phoneNumber
            size    
            company_description
            urlWebsite 
            created_at     
            updated_at
            deleted_at
        }
    }
`

export const SHOW_ALL_TEAMS = gql`
    query {
        ShowAllTeams {
            name
            participants
            taskMeta
            organisation
        }
    }
`

export const GET_TEAM_DETAILS = gql`
    query(
        $teamId: String!
    ) {
        GetTeamDetail(
            teamId: $teamId
        ) {
            _id
            name
            participants {
                _id
                name
            }
            skill {
                _id
                skill
            }
            orgId {
                _id
                name
            }
        }
    }
`

export const GET_ALL_PROJECTS = gql`
    query {
        GetAllProjects {
            _id
            name
            description
            problem_statement
            fileUrl
            domain
            created_at     
            updated_at
            deleted_at
            ngoId
            repoId
            status
            tags {
                _id
                skill
            }
            noOfModules
            progress
            gitlabProjectId
            ssh_url_to_repo
            http_url_to_repo
            web_url
        }
    }
`

export const MY_PROJECTS = gql`
    query(
        $NGOId: String!
    ) {
        MyProjects(
            NGOId: $NGOId
        ) {
            _id
            name
            description
            problem_statement
            fileUrl
            domain
            created_at     
            updated_at
            deleted_at
            ngoId
            repoId
            status
            tags {
                _id
                skill
            }
            noOfModules
            progress
            gitlabProjectId
            ssh_url_to_repo
            http_url_to_repo
            web_url
        }
    }
`

export const GET_PROJECT_FOR_NGO_BY_NGO_ID = gql`
    query(
        $ngoId: String!
    ) {
        GetProjectForNgoByNgoId(
            ngoId: $ngoId
        ) {
            _id
            name
            description
            problem_statement
            fileUrl
            domain
            created_at     
            updated_at
            deleted_at
            ngoId
            repoId
            status
            tags {
                _id
                skill
            }
            noOfModules
            progress
            gitlabProjectId
            ssh_url_to_repo
            http_url_to_repo
            web_url
        }
    }
`

export const GET_MODULE_FOR_PROJECT_BY_ID = gql`
    query(
        $projectId: String!
    ) {
        GetModuleForProjectById(
            projectId: $projectId
        ) {
            name
            _id
            projectId
            description
            status
            start_date
            end_date
            created_at     
            updated_at
            deleted_at
            assigned_to {
                _id
                name
            }
            skills {
                _id
                skill
            }
            ui_screen
            api_build
            db_tables
            commit_id
            repo
            noOfOngoingTasks
            noOfTasks
            noOfCompletedTasks
            requirements
        }
    }
`

export const GET_TASK_FOR_MODULE_BY_ID = gql`
    query(
        $moduleId: String!
    ) {
        GetTaskForModuleById(
            moduleId: $moduleId
        ) {
            _id
            name
            description
            ModuleId
            created_at     
            updated_at
            status
            assigned_to {
                _id
                name
            }
        }
    }
`


export const GET_NGO = gql`
    query {
        GetNgo {
            _id
            name
            address
            email
            phoneNumber
            size    
            company_description
            urlWebsite 
            created_at     
            updated_at
            deleted_at 
            NumberOfOnGoingProjects
            NumberOfcompletedProjects
        }
    }
`

export const GET_COMPANY = gql`
    query {
        GetCompany {
            _id
            phoneNumber
            teamSize
            name
            email
            password
            address
            size    
            company_description
            urlWebsite 
            created_at     
            updated_at
            deleted_at
        }
    }
`

export const GET_ALL_TEAMS = gql`
    query {
        GetAllTeams {
            _id
            name   
            participants {
                _id
                email
                name
                address
                type
                isAdmin
                created_at
                updated_at
                deleted_at
            }
            skill {
                _id
                skill
            }
            orgId {
                _id
                name
            }
        }
    }
`

export const GET_TEAMS_FOR_COMPANY = gql`
    query (
        $orgId: String!
    ){
        GetTeamsForCompany (
            orgId: $orgId
        ){
            _id
            name   
            participants {
                _id
                email
                name
                address
                type
                isAdmin
                created_at
                updated_at
                deleted_at
            }
            skill {
                _id
                skill
            }
            orgId {
                _id
                name
            }
        }
    }
`

export const GET_EMPLOYEES_FOR_COMPANY = gql`
    query (
        $orgId: String!
    ){
        GetEmployeeForCompany (
            orgId: $orgId
        ){
            _id
            email
            name
            address
            type
            ngoId {
                _id
                name
            }
            orgId  {
                _id
                name
            }
            coreId  {
                _id
                name
            }
            isAdmin
            created_at
            updated_at
            deleted_at
        }
    }
`

export const GET_PROJECTS_FOR_COMPANIES = gql`
    query(
        $companiesId: String!
    ) {
        GetProjectsForCompanies(
            companiesId: $companiesId
        ) {
            _id
            name
            description
            problem_statement
            fileUrl
            domain
            created_at     
            updated_at
            deleted_at
            ngoId
            repoId
            status
            tags {
                _id
                skill
            }
            noOfModules
            progress
            gitlabProjectId
            ssh_url_to_repo
            http_url_to_repo
            web_url
        }
    }
`

export const GET_SKILLS = gql`
    query {
        GetSkills {
            _id
            skill
        }
    }
`

export const GET_USER_DATA = gql`
    query {
        GetUserData {
            _id
            name
            email
            address
            type
            isAdmin
            ngoId {
                _id
                name
            }
            coreId {
                _id
                name
            }
            orgId {
                _id
                name
            }
        }
    }
`