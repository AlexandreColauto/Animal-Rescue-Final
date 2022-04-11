import Moralis from "moralis/types";
import React, { useState, useMemo, useCallback } from "react";
import { useMoralis } from "react-moralis";
import { useQuery } from "react-query";

interface dictionary {
  [key: string]: string;
}

type fetchCollection = [
  Moralis.Object<Moralis.Attributes>[],
  dictionary,
  boolean
];

function useFetchCollection() {
  const { enableWeb3, Moralis, isWeb3Enabled, isWeb3EnableLoading, user } =
    useMoralis();

  const APIFetch = async () => {
    if (!isWeb3Enabled) return;
    console.log("Call to Moralis");
    const Collection = Moralis.Object.extend("collection");
    const query = new Moralis.Query(Collection);
    const results = await query.find();
    console.log(results);
    return results;
  };
  const cachedCollection = useQuery("collection", APIFetch, {
    enabled: isWeb3Enabled,
    refetchOnWindowFocus: false,
  });

  const fetchUserCollection = async (): Promise<
    fetchCollection | [undefined, undefined, boolean]
  > => {
    if (!isWeb3Enabled) return [, , true];
    const { isLoading, data } = cachedCollection;
    console.log(cachedCollection);
    console.log(isLoading);
    const address = Moralis.account;
    const colDictionary: dictionary = {};
    const loading = isLoading;
    const _results: any = data;
    if (!_results) return [, , isLoading];
    const userResults = _results.filter((item: any) => {
      return item.get("owner") === address?.toLowerCase();
    });
    _results.map((col: any) => {
      const colName = col.get("name");
      const colAdd: string = col.get("collectionAddress").toLowerCase();
      colDictionary[colAdd] = colName;
      return colAdd;
    });

    return [userResults, colDictionary, loading];
  };

  const fetchAllCollections = async (): Promise<
    fetchCollection | [undefined, undefined, boolean]
  > => {
    !isWeb3Enabled ? await enableWeb3() : null;
    if (!isWeb3Enabled) return [, , true];
    const { isLoading, data } = cachedCollection;

    const address = Moralis.account;
    if (!address) return [, , isLoading];
    const loading = isLoading;
    const _results: any = data;
    const colDictionary: dictionary = {};
    console.log(_results);
    if (!_results) return [, , isLoading];
    _results.map((col: any) => {
      const colName = col.get("name");
      const colAdd: string = col.get("collectionAddress").toLowerCase();
      colDictionary[colAdd] = colName;
      return colAdd;
    });
    return [_results, colDictionary, loading];
  };

  return [fetchUserCollection, fetchAllCollections];
}

export default useFetchCollection;
