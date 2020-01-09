import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { Button, Modal, ModalBody, Input } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SearchAction from '@stores/ducks/search'
import Loading from '@components/Loading'
import Image from '@components/Image'

const Search = ({ t, search }) => {
  const dispatch = useDispatch()
  const { data, loading: laodingSearch } = useSelector(state => state.search)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [title, setTitle] = useState('')
  const [list, setList] = useState([])

  const formatInput = val => {
    const update = val
    return update.toString().replace(/[^A-Z0-9]+/gi, '+')
  }

  const searchHandler = async () => {
    const { gateway, path } = search
    let inputSearch = formatInput(input)
    setLoading(true)
    await dispatch(SearchAction.searchRequest(path, gateway, inputSearch))
  }

  const toggle = () => setModal(!modal)

  useEffect(() => {
    if (!laodingSearch && data && data.list) {
      setLoading(false)
      setTitle(data.title)
      setList(data.list)
    }
  }, [laodingSearch, data])

  return (
    <div className="wrap-search">
      <Button color="search" onClick={toggle}>
        {/* <span>{t('SEARCH')}</span> */}
        <FontAwesomeIcon icon={['fab', 'sistrix']} />
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="modal-fullcontainer">
        <ModalBody>
          <Button color="search-close" onClick={toggle}>
            <FontAwesomeIcon icon={['fas', 'times']} />
          </Button>

          <div className="conatainer-search">
            <div className="search">
              <div className="search-form">
                <Input
                  color="dark"
                  value={input}
                  placeholder={t('SEARCH')}
                  onChange={({ target: { value } }) => setInput(value)}
                />
                <Button
                  color="search-form"
                  disabled={input === ''}
                  onClick={searchHandler}
                >
                  <FontAwesomeIcon icon={['fab', 'sistrix']} />
                </Button>
              </div>
            </div>
            <Loading loading={loading} local>
              <div className="wrap-result">
                <div className="result-title">
                  {list.length > 0 ? (
                    <h1>
                      <span className="title-tag">#</span>
                      {t('SEARCH_RESULTS_FOR')}
                      <span>"{title}"</span>
                    </h1>
                  ) : null}
                </div>

                <div className="result">
                  {list.length > 0
                    ? list.map((item, i) => (
                        <div className="row-result" key={i}>
                          {item.image ? (
                            <div className="thumb-result">
                              <Image
                                src={item.image}
                                alt={item.title}
                                className="thumb"
                              />
                            </div>
                          ) : null}
                          <div className="body-result">
                            <Link
                              className="title"
                              to={`/${search.sufix}/${item.path}/${search.prefix}`}
                            >
                              {item.title}
                            </Link>
                            <h5>{item.subtitle}</h5>
                            <p>{item.summary}</p>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </Loading>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default withTranslation()(Search)
