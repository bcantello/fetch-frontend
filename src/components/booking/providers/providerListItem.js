import React, {useContext, useState} from "react";
import Book from '../../../assets/book.png'
import {AppContext} from "../../../App";
import {createAppointment, getProviderByZip} from "../../../services/api-helper";

export default function ProvidersListItem(props) {
	const appProps = useContext(AppContext);
	console.log(props.element['_id']);



	const handleBookClick = async() => {
		let book = props.element['_id'];
		appProps.setChosenProvider(book);
		const json = await createAppointment(appProps.appointmentInfo).then((response) => {
			if (response.status === 200) {
				console.log(response.data);
				appProps.setNewAppointment([...appProps.newAppointment, appProps.appointmentInfo]);
			} else {
				return ('login error');
			}
		}).catch(error => {
			return ("registration error" + error);
		});
	};



	return (
		<div className={'provider-item'}>
			<div className={'provider-image'}><img src={props.element.img} alt={'provider'}/></div>
			<div className={'provider-name'}>{props.element.name}</div>
			<div className={'book-provider-icon'}>
				<img src={Book} alt={'book me'} onClick={handleBookClick}/>
			</div>
		</div>
	);
};
