import React, { useState, useEffect } from 'react'
import { withTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap'

import { useDebounce } from '@services/debounce'

const Paginate = props => {
  const { t, pages, pagnation } = props
  const { maxPage, pageSize, page } = pages
  const [inputPage, setInputPage] = useState(parseInt(page))
  const debouncedInputPage = useDebounce(inputPage, 750)

  useEffect(() => {
    if (debouncedInputPage) {
      pagnation(debouncedInputPage)
    }
  }, [debouncedInputPage])

  return (
    <Pagination listClassName="justify-content-end align-items-center">
      <li>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="pagina" className="mr-sm-2">
              {`${pageSize} ${t('ITEMS')} ${t('PER_PAGE')}`}
            </Label>
            <Input
              type="text"
              name="actualPage"
              id="pagina"
              value={inputPage}
              onChange={({ target: { value } }) => setInputPage(value)}
            />
            <Label className="ml-sm-2 mr-sm-2">{`${t('BY')} ${maxPage}`}</Label>
          </FormGroup>
        </Form>
      </li>

      <PaginationItem disabled={parseInt(page) === 1}>
        <PaginationLink
          previous
          className="btn-page-icon"
          onClick={() => setInputPage(inputPage - 1)}
        >
          <FontAwesomeIcon icon={['fas', 'chevron-left']} />
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={page === maxPage}>
        <PaginationLink
          next
          className="btn-page-icon"
          onClick={() => setInputPage(inputPage + 1)}
        >
          <FontAwesomeIcon icon={['fas', 'chevron-right']} />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  )
}

export default withTranslation()(Paginate)
