const { createApp } = Vue;

createApp({
    data() {
        return {
            books: [],
            searchQuery: '',
            selectedGenre: '',
            genres: ['novel', 'science fiction', 'ffantasy', 'suspense', 'reasoning', 'history', 'biography', 'self-help', 'business', 'science and technology', 'travel', 'delicacies', 'art', 'children', 'youth literature'],
            newBook: {
                title: '',
                author: '',
                description: '',
                genre: '',
                publishedYear: '',
                isbn: '',
                coverImage: '/images/default-book-cover.jpg'
            }
        };
    },
    async mounted() {
        await this.loadBooks();
    },
    methods: {
        async loadBooks() {
            try {
                const response = await fetch('/api/books');
                this.books = await response.json();
            } catch (error) {
                console.error('Error loading books:', error);
            }
        },
        
        async searchBooks() {
            try {
                const params = new URLSearchParams();
                if (this.searchQuery) params.append('search', this.searchQuery);
                if (this.selectedGenre) params.append('genre', this.selectedGenre);
                
                const response = await fetch(`/api/books?${params}`);
                this.books = await response.json();
            } catch (error) {
                console.error('Error searching books:', error);
            }
        },
        
        async filterByGenre() {
            await this.searchBooks();
        },
        
        async recommendBook(bookId) {
            try {
                const response = await fetch(`/api/books/${bookId}/recommend`, {
                    method: 'PATCH'
                });
                const updatedBook = await response.json();
                
                // 更新本地书籍列表
                const index = this.books.findIndex(book => book._id === bookId);
                if (index !== -1) {
                    this.books[index] = updatedBook;
                }
            } catch (error) {
                console.error('Error recommending book:', error);
            }
        },
        
        async addToFavorites(bookId) {
            try {
                // 这里需要用户系统，暂时简单实现
                alert('The collection function requires users to log in to the system');
            } catch (error) {
                console.error('Error adding to favorites:', error);
            }
        },
        
        async addNewBook() {
            try {
                const response = await fetch('/api/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.newBook)
                });
                
                if (response.ok) {
                    const newBook = await response.json();
                    this.books.unshift(newBook);
                    this.resetNewBookForm();
                    alert('Book added successfully!');
                }
            } catch (error) {
                console.error('Error adding new book:', error);
                alert('Failed to add book');
            }
        },
        
        resetNewBookForm() {
            this.newBook = {
                title: '',
                author: '',
                description: '',
                genre: '',
                publishedYear: '',
                isbn: '',
                coverImage: '/images/default-book-cover.jpg'
            };
        },
        
        handleImageError(event) {
            event.target.src = '/images/default-book-cover.jpg';
        }
    }
}).mount('#app');