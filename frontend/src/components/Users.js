import { useEffect, useState } from "react";
import api from "../utils/Api";
import { Container, Col, Row} from 'reactstrap';
import UserTemplate from "./subcomponents/UserTemplate";

function Users () {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const data = await api.request("get", `/users`);
        if (data) {
            setUsers(data);
        }
    };

    useEffect((_) => {
        const intervalId = setInterval(() => {
            getUsers();
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container className="marginTop20">
            {
                users.map((user) =>
                    <UserTemplate user={user}/>
                )
            }
        </Container>
    )
}

export default Users;