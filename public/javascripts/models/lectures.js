import _fetch from '../../utils/fetchUtil.js'

const lecture = {
    _openLecture: undefined,
    async searchLecture(query) {
        this.lecture = []

        if (query.length >= 2) {
            const result = await _fetch.fetchAwait(`/api/${query}`, _fetch.option.post)

            if (Array.isArray(result)) {
                this.lecture = result.map(value=> {
                    // Remove Underline(_)
                    value.description = value.description.replace(/_/g, ' ')
                    return value
                })
            }
        }

        return this.lecture
    },
    getDataOfIdx(idx){
        return this.lecture[idx]
    },
    setOpenLecture(idx){
        this._openLecture = this.lecture[idx];
    },
    getOpenLecture(){
        return this._openLecture
    },
    resetOpenLecture(){
        this._openLecture = undefined;
    }

}

export default lecture