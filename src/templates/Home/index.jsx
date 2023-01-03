import { Component } from "react";

import "./styles.css";

import { Post } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput"

import { loadPosts } from "../../utils/load-posts";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 4,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const {page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts, 
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts: posts, page: nextPage});
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value});
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? 
      allPosts.filter( post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      : posts;

    return (
      <section className='container'>
        <div className="search-container">
          {
            !!this.state.searchValue && 
              <h1>search is: {this.state.searchValue} </h1>
          }

          <TextInput 
            serachValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {
          filteredPosts.length > 0 ? 
          <Post posts={filteredPosts} />
          : <p>No results =(</p>
        }
        
        <div className="button-container">
          {
            !this.state.searchValue && 
              <Button 
                // passando o atributo e não o evento
                onClick={this.loadMorePosts}
                disabled={noMorePosts}
                text="Load more posts"
              />
          }
        </div>
      </section>
    );
  }
}

export default Home;
