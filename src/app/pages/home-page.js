import React from "react";
import { url } from "../../../environment/environment";
import {
  Button,
  Container,
  Navbar,
  Nav,
  InputGroup,
  FormControl,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import {
  BiUser,
  BiBook,
  BiCaretDown,
  BiFilter,
  BiMessage,
} from "react-icons/bi";
import { FaSearch, FaStar, FaShare, FaExclamationCircle } from "react-icons/fa";
import { useState } from "react";
import { vars } from "../../../vars";

const FeedCard = ({ data: { title, subTitle, content, createdAt } }) => {
  return (
    <Card className="shadow p-3">
      <div className="d-flex justify-content-between pb-3">
        <div className="feed-title">{title}</div>
        <div>{createdAt.split("T")[0]}</div>
      </div>

      <Card.Title>{subTitle}</Card.Title>
      <Card.Body className="p-0">
        <Card.Text>{content}</Card.Text>
        <div className="d-flex justify-content-between">
          <div className="d-flex feed-card-icon-gap">
            <FaStar /> <BiMessage /> <FaShare /> <FaExclamationCircle />
          </div>
          <div>Lorem ipsum dolor</div>
        </div>
      </Card.Body>
    </Card>
  );
};

const SearchBar = () => {
  return (
    <div className="d-flex">
      <InputGroup className="mr-3">
        <InputGroup.Text className="hp-search" id="search-icon">
          <FaSearch />
        </InputGroup.Text>
        <FormControl
          className="hp-search-text"
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="search-icon"
        />
      </InputGroup>
      <Button variant="info">
        <BiFilter />
      </Button>
    </div>
  );
};

const Posts = ({ data }) => {
  return (
    <div>
      <SearchBar />
      <div className="d-flex my-4 justify-content-between">
        <Button className="outline-light-cus mr-2">btn</Button>
        <Button className="outline-light-cus mr-2">btn</Button>
        <Button className="outline-light-cus mr-2">btn</Button>
        <Button className="outline-light-cus">btn</Button>
      </div>
      <div>
        {data.map((item) => (
          <div className="card mb-3">
            <FeedCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

const AccountDetails = () => {
  return (
    <div className="wrapper">
      <div className="name d-flex">
        <div>
          <img
            className="acc-img"
            src={
              "https://www.freecodecamp.org/news/content/images/size/w2000/2022/02/arrows-2889040_1920.jpg"
            }
          />
        </div>
        <div className="text-white">
          <div>title</div>
          <div>subtitle</div>
        </div>
      </div>
      <br />
      <div className="name d-flex">
        <div>
          <img
            className="acc-img"
            src={
              "https://www.freecodecamp.org/news/content/images/size/w2000/2022/02/arrows-2889040_1920.jpg"
            }
          />
        </div>
        <div className="text-white">some name</div>
        <div className="caret-down text-white">
          <BiCaretDown size={12} />
        </div>
      </div>
      <br />
      <div className="d-grid mb-4">
        <Button variant="danger" className="w-100 mb-3">
          Danger
        </Button>{" "}
        <Button variant="outline-light" className="w-100">
          Danger
        </Button>{" "}
      </div>
      <div className="mt-4">
        <Navbar expand="md" className="flex-md-column m-0 p-0">
          <Container className="p-0">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="flex-md-column w-100">
                <Nav.Item className="mb-2 hp-navbar-items">
                  <Nav.Link as={Link} to="/">
                    <AiOutlineHome size={24} />
                    <span className="ml-2 text-white">Home</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2 hp-navbar-items">
                  <Nav.Link as={Link} to="/about">
                    <BiUser size={24} />
                    <span className="ml-2 text-white">Users</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="mb-2 hp-navbar-items">
                  <Nav.Link as={Link} to="/contact">
                    <BiBook size={24} />
                    <span className="ml-2 text-white">Books</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

const Ads = () => {
  return (
    <div>
      <div className="d-grid mb-4">
        <Button variant="danger" className="w-100 mb-3">
          <div>Danger</div>
          <div className="ads-font">Danger</div>
        </Button>{" "}
        <Button variant="outline-dark" className="w-100">
          <div>Danger</div>
          <div className="ads-font">Danger</div>
        </Button>{" "}
      </div>
      <div className="anchor mb-5">Lorem ipsum</div>
      <div className="ad"></div>
    </div>
  );
};

export default function HomePage() {
  const [posts, setPosts] = new useState([]);
  const authorization = vars.token;

  fetch(`${url}/posts`, {
    method: "GET",
    headers: { authorization: authorization },
  }).then(async (res) => {
    if (res.ok) {
      setPosts(await res.json());
    }
  });

  return (
    <div className="feeds">
      <div className="account">
        <AccountDetails />
      </div>
      <div className="posts">
        <Posts data={posts} />
      </div>
      <div className="ads">
        <Ads />
      </div>
    </div>
  );
}
