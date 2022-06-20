import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser(
        $email: String!
        $name: String!
        $phoneNumber: String
        $address: String
        $isAdmin: String!
        $skill: [String]
    ) {
        createUser(
            userinput: {
                email: $email
                name: $name
                phoneNumber: $phoneNumber
                address: $address
                isAdmin: $isAdmin
                skill: $skill
            }
        ) {
            _id
            email
            name
            password
            phoneNumber
            address
            type
            ngoId {
                _id
                name
            }
            orgId {
                _id
                name
            }
            coreId {
                _id
                name
            }
            isAdmin
            created_at
            updated_at
            deleted_at
        }
    }
`;

export const CREATE_ORGANISATION = gql`
    mutation createOrganisation(
        $name: String!
        $phoneNumber: String
        $address: String
        $email: String!
        $company_description: String
        $urlWebsite: String
    ) {
        createOrganisation(
            organisationinput: {
                name: $name
                phoneNumber: $phoneNumber
                address: $address
                email: $email
                company_description: $company_description
                urlWebsite: $urlWebsite
            }
        ) {
            _id
            name
            email
            password
            phoneNumber
            address
            size
            company_description
            urlWebsite
            created_at
            updated_at
            deleted_at
        }
    }
`;

export const CREATE_NGO = gql`
    mutation createNgo(
        $name: String!
        $phoneNumber: String
        $address: String
        $email: String!
        $company_description: String
        $urlWebsite: String
    ) {
        createNgo(
            organisationinput: {
                name: $name
                phoneNumber: $phoneNumber
                address: $address
                email: $email
                company_description: $company_description
                urlWebsite: $urlWebsite
            }
        ) {
            _id
            name
            phoneNumber
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
`;

export const CREATE_PROJECT = gql`
    mutation createProject(
        $name: String
        $description: String
        $problem_statement: String
        $fileUrl: String
        $domain: String
        $repoId: String
        $ngoId: String
        $status: String
        $tags: [String]
    ) {
        createProject(
            projectinput: {
                name: $name
                description: $description
                problem_statement: $problem_statement
                fileUrl: $fileUrl
                domain: $domain
                ngoId: $ngoId
                repoId: $repoId
                status: $status
                tags: $tags
            }
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
            gitlabProjectId
            ssh_url_to_repo
            http_url_to_repo
            web_url
        }
    }
`;

export const CREATE_TEAM = gql`
    mutation createTeam(
        $name: String
        $participants: [String]
        $skill: [String]
        $orgId: String
    ) {
        createTeam(
            teaminput: {
                name: $name
                participants: $participants
                skill: $skill
                orgId: $orgId
            }
        ) {
            name
            participants {
                _id
                email
                name
                address
                type
            }
            skill {
                _id,
                skill
            }
        }
    }
`;

export const UPDATE_STATUS_OF_PROJECT = gql`
    mutation UpdateStatusOfProject(
        $projectId: String!
        $status: String
    ) {
        UpdateStatusOfProject(
            projectId: $projectId
            status: $status
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
            gitlabProjectId
            ssh_url_to_repo
            http_url_to_repo
            web_url
        }
    }
`;

export const UPDATE_MODULE_STATUS = gql`
    mutation UpdateModuleStatus(
        $moduleId: String!
        $status: String!
    ) {
        UpdateModuleStatus(
            moduleId: $moduleId
            status: $status
        ) {
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
            skills {
                _id
                skill
            }
            noOfOngoingTasks
            noOfTasks
            noOfCompletedTasks
            requirements
        }
    }
`;

export const UPDATE_STATUS_OF_TASK = gql`
    mutation UpdateStatusOfTask(
        $TaskId: String!
        $status: String!
    ) {
        UpdateStatusOfTask(
            TaskId: $TaskId
            status: $status
        ) {
            _id
            name
            description
            ModuleId
            created_at     
            updated_at
            status
        }
    }
`;

export const ADD_MODULE_TO_PROJECT_BY_ID = gql`
    mutation AddModuleToProjectById(
        $projectId: String!
        $name: String
        $description: String
        $status: String
        $start_date: String
        $end_date: String
        $skills: [String]
        $ui_screen: String
        $api_build: String
        $db_tables: String
        $commit_id: String
        $repo: String
    ) {
        AddModuleToProjectById(
            moduleInput: {
                projectId: $projectId
                name: $name
                description: $description
                status: $status
                start_date: $start_date
                end_date: $end_date
                skills: $skills
                ui_screen: $ui_screen
                api_build: $api_build
                db_tables: $db_tables
                commit_id: $commit_id
                repo: $repo
            }
        ) {
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
`;

export const ADD_TASK_TO_MODULE_BY_ID = gql`
    mutation AddTaskToModuleById(
        $name: String
        $description: String
        $status: String
        $ModuleId: String
    ) {
        AddTaskToModuleById(
            taskInput: {
                name: $name
                description: $description
                status: $status
                ModuleId: $ModuleId
            }
        ) {
            _id
            name
            description
            ModuleId
            created_at     
            updated_at
            status
        }
    }
`;

export const ADD_USER_TO_TEAM = gql`
    mutation AddUserToTeam(
        $userIds: [String]
        $teamId: String
    ) {
        AddUserToTeam(
            userIds: $userIds
            teamId: $teamId
        ) {
            _id
            name
            description
            ModuleId
            created_at     
            updated_at
            status
        }
    }
`;

export const ADD_EMPLOYEE_TO_COMPANY = gql`
    mutation AddEmployeeToCompany(
        $employeeId: String!
        $companyId: String!
    ) {
        AddEmployeeToCompany(
            employeeId: $employeeId
            companyId: $companyId
        ) {
            _id
            email
            password
            name
            username
            address
            pincode
            type
            ngoId
            orgId
            created_at
            updated_at
            deleted_at
            iscore
        }
    }
`;

export const REMOVE_EMPLOYEE_FROM_COMPANY = gql`
    mutation RemoveEmployeeFromCompany(
        $employeeId: String!
    ) {
        RemoveEmployeeFromCompany(
            employeeId: $employeeId
        ) {
            _id
            email
            password
            name
            username
            address
            pincode
            type
            ngoId
            orgId
            created_at
            updated_at
            deleted_at
            iscore
        }
    }
`;

export const ASSIGN_MODULE_TO_TEAM = gql`
    mutation AssignModuleToTeam(
        $teamId: String!
        $moduleId: String!
    ) {
        AssignModuleToTeam(
            teamId: $teamId
            moduleId: $moduleId
        ) {
            _id
            moduleId {
                _id
                name
            }
            projectId 
            orgId 
        }
    }
`;

export const ASSIGN_TASK_TO_USER = gql`
    mutation AssignTaskToUser(
        $UserId: String!
        $taskId: String!
    ) {
        AssignTaskToUser(
            UserId: $UserId
            taskId: $taskId
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
`;

export const GLOBAL_SKILL_ADD = gql`
    mutation GlobalSkillAdd(
        $skills: [String!]!
    ) {
        GlobalSkillAdd(
            skills: $skills
        ) {
            _id
            skill
        }
    }
`;

export const GLOBAL_SKILL_REMOVE = gql`
    mutation GlobalSkillRemove(
        $skills: [String!]!
    ) {
        GlobalSkillRemove(
            skills: $skills
        ) {
            _id
            skill
        }
    }
`;