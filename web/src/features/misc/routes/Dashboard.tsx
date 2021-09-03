import { SimpleGrid } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Head } from "../../../components/Head";
import Link from "../../../components/Link";
import Panel from "../../../components/Panel";
import { Column, Table } from "../../../components/Table";
import { Book, Publisher, Series, SortDirectionEnum } from "../../../types";
import { convertToArray } from "../../../utils/convertToArray";
import { useBooksQuery } from "../../books/api/books.query.generated";
import { useRankedBookListQuery } from "../../books/api/ranked-book-list.query.generated";
import { useRankedPublisherListQuery } from "../../publishers/api/ranked-publisher-list.query.generated";
import { useRankedSeriesListQuery } from "../../series/api/ranked-series-list.query.generated";

const TOP_SUMMARY_COUNT = 5;

const bookColumns: Array<Column<Book>> = [
  { key: "publisherName", label: "Publisher" },
  { key: "seriesName", label: "Series" },
  { key: "issue", label: "Issue" },
  { key: "price", label: "Cost" },
  { key: "pageCount", label: "Pages" },
];

export default function HomePage(): ReactElement {
  const topPublisherResult = useRankedPublisherListQuery({
    variables: {
      limit: TOP_SUMMARY_COUNT,
      field: "series_count",
      direction: SortDirectionEnum.Desc,
    },
  });

  const topPublishers = convertToArray<Publisher>(
    topPublisherResult.data?.publishers.nodes
  );

  const topSeriesResult = useRankedSeriesListQuery({
    variables: {
      limit: TOP_SUMMARY_COUNT,
      field: "book_count",
      direction: SortDirectionEnum.Desc,
    },
  });

  const topSeries = convertToArray<Series>(
    topSeriesResult.data?.seriesList.nodes
  );

  const latestBooksResult = useRankedBookListQuery({
    variables: {
      limit: TOP_SUMMARY_COUNT,
      field: "created_at",
      direction: SortDirectionEnum.Desc,
    },
  });

  const latestBooks = convertToArray<Book>(latestBooksResult.data?.books.nodes);

  const { data, loading, error } = useBooksQuery({ variables: { limit: 50 } });
  let bookTable = <></>;
  if (loading) {
    bookTable = <>Loading...</>;
  } else if (error) {
    bookTable = <>An error has occured</>;
  } else {
    const books = convertToArray<Book>(data?.books.nodes);
    bookTable = <Table items={books} columns={bookColumns} />;
  }

  return (
    <>
      <Head title="Home" />
      <SimpleGrid columns={3} spacing={10}>
        <Panel
          headerText="Top Publishers"
          items={topPublishers}
          render={(item) => (
            <>
              <Link to={`/publishers/${item.id}`}>{item.name}</Link> (
              {item.seriesCount})
            </>
          )}
        />
        <Panel
          headerText="Top Series"
          items={topSeries}
          render={(item) => (
            <>
              <Link to={`/series/${item.id}`}>{item.name}</Link> (
              {item.bookCount})
            </>
          )}
        />
        <Panel
          headerText="Latest Books"
          items={latestBooks}
          render={(item) => (
            <Link to={`/comics/${item.id}`}>{item.displayName}</Link>
          )}
        />
      </SimpleGrid>
      {bookTable}
    </>
  );
}
