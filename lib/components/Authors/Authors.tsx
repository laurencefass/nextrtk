'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    addAuthor,
    updateAuthor,
    removeAuthor,
    fetchAuthors,
    saveAuthors,
    selectAuthors,
    useDispatch,
    Author,
    selectAuthorEntities,
    selectAllArticles,
    Article,
    selectArticleEntities,
    selectArticles,
    fetchArticles
} from "@/lib/redux"; // Ensure these actions and selector are properly defined for authors
import "@styles/globals.scss"

const Header = () => {
    return <>
        <h2>Authors</h2>
        <p>Enter id and Select Author to update</p>
    </>
}

interface AuthorListProps {
    onSelectAuthor: (author: Author) => void;
}

export const AuthorList: React.FC<AuthorListProps> = ({ onSelectAuthor }) => {
    const { entities, loading, saving } = useSelector(selectAuthors);
    const articles = useSelector(selectAllArticles);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArticles());
        dispatch(fetchAuthors());
    }, []);

    const renderArticlesByAuthor = (authorId: string) => {
        const filteredArticles = articles.filter((article: Article) => article.authorId === authorId);

        if (filteredArticles.length > 0) {
            return (
                <>
                    <h4>Articles by this author</h4>
                    <ul>
                        {filteredArticles.map((article: Article) => (
                            <li key={article.id}>{article.title}</li>
                        ))}
                    </ul>
                </>
            );
        } else {
            return (
                <>
                    <h4>Articles by this author</h4>
                    <p>No articles</p>
                </>
            );
        }
    };

    if (saving) {
        return <>
            <Header />
            <p>Saving...</p>
        </>
    }

    if (loading) {
        return <>
            <Header />
            <p>Loading...</p>
        </>
    }

    return (
        <div>
            <Header />
            <div>
                {/* <pre>
                    <h1>Articles</h1>
                    { JSON.stringify(articles, null, 2) }
                </pre> */}
                {Object.keys(entities).length === 0 ? (
                    <p>No authors available</p>
                ) : (
                    Object.values(entities).map((author) => (
                        <div
                            className="block-item highlight-on-hover"
                            key={author.id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => onSelectAuthor(author)}
                        >
                            <h3>{author.name} ({author.id})</h3>
                            {renderArticlesByAuthor(author.id)}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

interface AuthorCRUDProps {
    selectedAuthor: Author | null;
}

const AuthorCRUD: React.FC<AuthorCRUDProps> = ({ selectedAuthor }) => {
    const [authorId, setAuthorId] = useState('');
    const [name, setName] = useState('');
    let authors = useSelector(selectAuthorEntities);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthors());
    }, []);

    useEffect(() => {
        if (selectedAuthor) {
            setAuthorId(selectedAuthor.id);
            setName(selectedAuthor.name);
        }
    }, [selectedAuthor]);

    const handleFetchAuthors = () => {
        dispatch(fetchAuthors());
    }

    const handleSelectAuthor = () => {
        const author = authors[authorId];
        if (author) {
            setName(author.name);
        } else {
            console.log("Author not found");
            resetForm();
        }
    };

    const handleSaveChanges = () => {
        // Assuming `saveAuthors` would handle an array of authors or similar logic
        const allAuthors = Object.values(authors);
        dispatch(saveAuthors(allAuthors));
    };

    const handleAddAuthor = () => {
        dispatch(addAuthor({ id: authorId, name }));
        resetForm();
    };

    const handleUpdateAuthor = () => {
        dispatch(updateAuthor({ id: authorId, changes: { name } }));
        resetForm();
    };

    const handleRemoveAuthor = () => {
        dispatch(removeAuthor(authorId));
        resetForm();
    };

    const resetForm = () => {
        setAuthorId('');
        setName('');
    };

    return (
        <div className="pad-bottom-10">
            <h2>Author Details</h2>
            <div>
                <input
                    type="text"
                    placeholder="Author ID"
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleSelectAuthor}>Select Author</button>
                <button onClick={handleAddAuthor}>Add Author</button>
                <button onClick={handleUpdateAuthor}>Update Author</button>
                <button onClick={handleRemoveAuthor}>Remove Author</button>
                <button onClick={handleSaveChanges}>Save Authors</button>
                <button onClick={handleFetchAuthors}>Fetch Authors</button>
            </div>
        </div>
    );
};

const AuthorManager = () => {
    const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

    const handleSelectAuthor = useCallback((author: Author) => {
        setSelectedAuthor(author);
    }, []);

    return (
        <div>
            <AuthorCRUD selectedAuthor={selectedAuthor} />
            <AuthorList onSelectAuthor={handleSelectAuthor} />
        </div>
    );
};

export default AuthorManager;
