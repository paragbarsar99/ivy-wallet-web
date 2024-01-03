import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getDate, getDay } from '../hooks/Functions'
import { PlusButton } from '../components/add-functionalities/PlusButton'
import { LoadingComponent } from '../components/LoadingComponent'
import { Link } from 'react-router-dom'

export const Category = () => {
    // fetch url from local storage
    const url = localStorage.getItem('theURL') || ''
    const nm = localStorage.getItem('category') || ''

    const [data, setData] = useState<any>([])
    const [group, setGroup] = useState<any>(nm)
    const [fetching, setFetch] = useState<boolean>(true)

    // use axios
    function fetchData() {
        axios.get(url)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        setFetch(false)
    }

    useEffect(() => {
        fetching && fetchData()
    })

    // load page after data is fetched
    if (data.transactions === undefined) {
        return (
            <LoadingComponent />
        )
    }

    const currentData = data.transactions.filter((item: any) => item.type !== "TRANSFER")

    // get name from accounts array using id from transactions
    currentData.map((item: any) => {
        const account = data.accounts.find((account: any) => account.id === item.accountId)
        const color = data.accounts.find((account: any) => account.id === item.accountId)
        const currency = data.accounts.find((account: any) => account.id === item.accountId)
        const icon = data.accounts.find((account: any) => account.id === item.accountId)

        item.accountName = account.name
        item.accountColor = color.color
        item.accountCurrency = currency.currency
        item.accountIcon = icon.icon

        return item
    })

    // get name form categories array using id from transactions
    currentData.map((item: any) => {
        const category = data.categories.find((category: any) => category.id === item.categoryId)
        const color = data.categories.find((category: any) => category.id === item.categoryId)
        const icon = data.categories.find((category: any) => category.id === item.categoryId)
        item.category = category.name
        item.color = color.color
        item.icon = icon.icon

        return item
    })

    // show all categories
    const categories = data.categories

    // save function
    function save(nm: any) {
        localStorage.setItem('category', nm)
        setGroup(nm)
    }
    
    // get sum of transactions
    const sum = currentData.filter((item: any) => item.category === group)
        .map((item: any) => item.amount)
        .reduce((acc: any, item: any) => acc + item, 0)

        
    return (
        <div className="container mb-32 mx-auto justify-center items-center">
            <div className='flex flex-wrap flex-row'>
            {sum === 0 ? (
                    <div className="text-4xl font-bold text-center my-10">
                        No transactions found
                    </div>
                ) : (

                    <div className="text-4xl font-bold text-center my-10">
                        Total: {sum} {currentData[0].accountCurrency}
                    </div>
                )}
                {
                    categories.map((item: any) => (
                        <div className="p-5 lg:w-48 md:w-72 m-1 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:shadow-lg cursor-pointer hover:brightness-110 transition duration-300 ease-in-out"
                            style={item.name === group ? { border: "2px solid #10B981" } : { border: "none" }}
                            onClick={() => (save(item.name))}>
                            <p
                                key={item.id + 'date'}
                                className="text-xl font-bold">
                                {item.name}
                            </p>
                            <p
                                key={item.id + 'day'}
                                className="text-slate-500 dark:text-slate-300 text-sm font-medium">
                                {item.currency}
                            </p>
                            <p
                                key={item.id + 'day'}
                                className="text-slate-500 dark:text-slate-300 text-sm font-medium">
                                {item.balance}
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className="mx-auto flex flex-row flex-wrap justify-center items-center">
                {
                    // only show transaction with same category name
                    currentData.map((item: any) => (
                        item.category === group &&

                        <div className="flex justify-center slide-r">
                            <div className="p-5 lg:w-96 md:w-72 m-10 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:shadow-lg cursor-default">
                                <p
                                    key={item.id + 'date'}
                                    className="text-xl font-bold">
                                    {getDate(item.dateTime)}
                                </p>
                                <p
                                    key={item.id + 'day'}
                                    className="text-slate-500 dark:text-slate-300 text-sm font-medium">
                                    {getDay(item.dateTime)}
                                </p>

                                <div className="flex flex-row flex-wrap justify-around text-lg font-bold my-5">
                                    <Link to={`/Category/`}
                                        onClick={() => localStorage.setItem('category', item.category)}>
                                        <p key={item.id + 'category'}
                                            className="bg-green-100 dark:bg-green-800 p-2 px-10 m-1 rounded-full hover:shadow-md cursor-pointer">
                                            {/* {item.icon} */}
                                            {/* {item.color} */}
                                            {item.category}
                                        </p>
                                    </Link>
                                    <Link to={`/Accounts/`}
                                        onClick={() => localStorage.setItem('account', item.accountName)}>
                                        <p key={item.id + 'account name'}
                                            className="bg-white p-2 dark:bg-gray-900 px-10 m-1 rounded-full hover:shadow-md cursor-pointer">
                                            {/* {item.accountIcon} */}
                                            {/* {item.accountColor} */}
                                            {item.accountName}
                                        </p>
                                    </Link>
                                </div>

                                <p key={item.id + 'id'} className="text-2xl font-bold my-3">
                                    {item.title}
                                </p>
                                <p key={item.id + 'description'} className="text-slate-500 dark:text-slate-200 my-3">
                                    {item.description}
                                </p>
                                <p key={item.id + 'amount'}
                                    className={`text-5xl font-extrabold ml-12 flex flex-wrap 
                        ${item.type === "EXPENSE" ? "" : "text-green-500"}`}>
                                    {item.amount}
                                    <abbr
                                        key={item.id + 'currency'}
                                        className="font-normal ml-2">
                                        {item.currency}
                                    </abbr>
                                </p>
                            </div>
                        </div>

                    ))
                }
                <PlusButton />
            </div>
        </div>
    )
}