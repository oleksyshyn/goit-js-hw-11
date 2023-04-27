import axios from 'axios';

export default class PixabayService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }

    async getPhotos() {
        try {
            const url = 'https://pixabay.com/api/';       
            const response = await axios.get(url, {
                params: {
                    key: '35816515-8a00d30cd5d7f589803acf0cd',
                    q: this.searchQuery,
                    image_type: "photo",
                    orientation: "horizontal",
                    safesearch: true,
                    per_page: this.per_page,
                    page: this.page
                }
            });
            this.incrementPage();
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    incrementPage() {
       this.page += 1; 
    }
    resetPage() {
        this.page = 1;
    }

    // get query() {
    //     return this.searchQuery;
    // }

    // set query(newQuery) {
    //     this.searchQuery = newQuery;
    // }

    // fetchPhotos() {
    //     console.log(this);
    //     const url = 'https://pixabay.com/api/';
        
    //     axios.get(url, {
    //         params: {
    //             key: '35816515-8a00d30cd5d7f589803acf0cd',
    //             q: this.searchQuery,
    //             image_type: "photo",
    //             orientation: "horizontal",
    //             safesearch: true,
    //             per_page: 40,
    //             page: 1
    //         }
    //     })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // }
}


