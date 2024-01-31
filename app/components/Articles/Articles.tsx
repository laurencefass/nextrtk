'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    addArticle,
    updateArticle,
    removeArticle,
    fetchArticles,
    saveArticles,
    selectArticles,
    useDispatch,
    selectAllAuthors,
    selectAuthors,
    Article,
} from "@/lib/redux"; // Update imports to match articles' actions and selectors
import "@styles/globals.css"

const Header = () => {
    return <>
        <h2>Articles</h2>
        <p>Enter id and Select Article to update</p>
    </>
}

interface ArticleListProps {
    onSelectArticle: (article: Article) => void;
}
  
export const ArticleList: React.FC<ArticleListProps> = ({ onSelectArticle }) => {
    const { entities, loading, saving } = useSelector(selectArticles);
    // const authors = useSelector(selectAllAuthors);
    let authors = useSelector(selectAuthors).entities;

    if (saving) {
        return <>
            <Header/>
            <p>Saving...</p>
        </>
    }

    if (loading) {
        return <>
            <Header/>
            <p>Loading...</p>
        </>
    }

    return (
        <div>
            <Header/>
            <div>
                {Object.keys(entities).length === 0 ? (
                    <p>No articles available</p>
                ) : (
                    Object.values(entities).map((article) => (
                        <div 
                            className="article bold-on-hover"
                            key={article.id} 
                            onClick={() => onSelectArticle(article)}
                            style={{ cursor: 'pointer' }}
                        >
                          <div> title: {article.title}</div>
                          <div> author: {authors[article.authorId]?.name || "Unknown Author"}</div>
                          <div> content: {article.content}</div> 
                          <div> article id: ({article.id})</div> 
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

interface ArticleCRUDProps {
    selectedArticle: Article | null;
}

const ArticleCRUD: React.FC<ArticleCRUDProps> = ({ selectedArticle }) => {
    const [articleId, setArticleId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const articles = useSelector(selectArticles).entities;
    const authors = useSelector(selectAllAuthors); // Use the selector to get all authors
    const dispatch = useDispatch();

    const handleSelectArticle = () => {
        const article = articles[articleId];
        if (article) {
            setTitle(article.title);
            setAuthorId(article.authorId);
            setContent(article.content);
        } else {
            console.log("Article not found");
            resetForm();
        }
    };

    useEffect(() => {
        if (selectedArticle) {
          // Update local state with selectedArticle details
          setArticleId(selectedArticle.id);
          setAuthorId(selectedArticle.authorId);
          setTitle(selectedArticle.title);
          setContent(selectedArticle.content);
        }
      }, [selectedArticle]);

    useEffect(() => {
        dispatch(fetchArticles());
        // dispatch(fetchAuthors()); // Fetch authors to ensure the select box has the latest data
    }, []);

    const handleFetchArticles = () => {
        dispatch(fetchArticles());    
    }

    const handleSaveChanges = () => {
        const allArticles = Object.values(articles);
        dispatch(saveArticles(allArticles)); // Updated action
    };

    const handleAddArticle = () => {
        dispatch(addArticle({ id: articleId, authorId, title, content }));
        resetForm();
    };

    const handleUpdateArticle = () => {
        dispatch(updateArticle({ id: articleId, changes: { authorId, title, content }}));
        resetForm();
    };

    const handleRemoveArticle = () => {
        dispatch(removeArticle(articleId)); // Updated action
        resetForm();
    };

    const resetForm = () => {
        setArticleId('');
        setAuthorId('');
        setTitle('');
        setContent('');
    };

    return (
        <div className="pad-bottom-10">
            <h2>Article Details</h2>
            <div>
                <input
                    type="text"
                    placeholder="Article ID"
                    value={articleId}
                    onChange={(e) => setArticleId(e.target.value)}
                />
                <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                >
                    <option value="">Select an Author</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleSelectArticle}>Select Article</button>
                <button onClick={handleAddArticle}>Add Article</button>
                <button onClick={handleUpdateArticle}>Update Article</button>
                <button onClick={handleRemoveArticle}>Remove Article</button>
                <button onClick={handleSaveChanges}>Save Articles</button>
                <button onClick={handleFetchArticles}>Fetch Articles</button>
            </div>
        </div>
    );
};

const __ArticleCRUD = () => {
    const [articleId, setArticleId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    let articles = useSelector(selectArticles).entities; // Updated selector
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArticles()); // Updated action
    }, []);

    const handleFetchArticles = () => {
        dispatch(fetchArticles());    
    }

    const handleSelectArticle = () => {
        const article = articles[articleId];
        if (article) {
            setTitle(article.title);
            setAuthorId(article.authorId);
            setContent(article.content);
        } else {
            console.log("Article not found");
            resetForm();
        }
    };

    const handleSaveChanges = () => {
        const allArticles = Object.values(articles);
        dispatch(saveArticles(allArticles)); // Updated action
    };

    const handleAddArticle = () => {
        dispatch(addArticle({ id: articleId, title, authorId, content })); // Updated action
        resetForm();
    };

    const handleUpdateArticle = () => {
        dispatch(updateArticle({ id: articleId, changes: { title, content }})); // Updated action
        resetForm();
    };

    const handleRemoveArticle = () => {
        dispatch(removeArticle(articleId)); // Updated action
        resetForm();
    };

    const resetForm = () => {
        setArticleId('');
        setTitle('');
        setContent('');
    };

    return (
        <div className="pad-bottom-10">
            <h2>Article details (enter id to Select details)</h2>
            <div>
                <input
                    type="text"
                    placeholder="Article ID"
                    value={articleId}
                    onChange={(e) => setArticleId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="author ID"
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <h2>Article CRUD Operations</h2>
            <p>Save Changes will persist to backend</p>
            <div>
                <button onClick={handleSelectArticle}>Select Article</button>
                <button onClick={handleAddArticle}>Add Article</button>
                <button onClick={handleUpdateArticle}>Update Article</button>
                <button onClick={handleRemoveArticle}>Remove Article</button>
                <button onClick={handleSaveChanges}>Save Articles</button>
                <button onClick={handleFetchArticles}>Fetch Articles</button>
            </div>
        </div>
    );
};


const ArticleManager = () => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
    const handleSelectArticle = useCallback((article: Article) => {
      setSelectedArticle(article);
    }, []);
  
    return (
      <div>
        <h1>ArticleManager</h1>
        <ArticleCRUD selectedArticle={selectedArticle} />
        <ArticleList onSelectArticle={handleSelectArticle} />
      </div>
    );
  };
export default ArticleManager;
