import { Page, Locator } from "@playwright/test";

export default class locatorsPageWebElementPage {

    username_text_box: Locator;
    password_text_box: Locator;
    // country_dropdown: Locator;
    // country_english: Locator;
    sign_in: Locator;
    // logo_img: Locator;
    // selected_country: Locator;
    // fetching_data: Locator;
    icon_admin_btn: Locator;
    menu_side_bar: Locator;
    member_email_text: Locator;
    member_confirm_btn: Locator;
    continue_with_email_btn: Locator;
    member_password_text_box: Locator;
    member_signIn_button: Locator;
    member_dashboard_text: Locator;
    member_radio_button: Locator;
    zone_dropdown: any;
    member_setting_menu: Locator;
    member_general_setting_menu: Locator;
    car_plates: Locator;
    add_vehicle_icon: Locator;
    select_vehicle_size: Locator;
    select_vehicle_Fuel: Locator;
    select_vehicle_accessibility: Locator;
    select_vehicle_sharing: Locator;
    update_setting_button: Locator;
    refreshButton: Locator;
    availableDays: Locator;
    notAvailableDays: Locator;
    availableFirstDaysForBooking: Locator;
    selectVehicleDropdown: Locator;
    getRandomSpaceButton: Locator;
    succsessMessage: Locator;
    bookedSpot: Locator;
    availableFirstDaysForBookingDate: Locator;
    meeting_Room_First: Locator;
    desk_spot_First: Locator;
    goto_map_btn: Locator;
    desk_spot_Available: Locator;
    meeting_Room_Available: Locator;
    book_space_btn: Locator;
    currunt_booking_book_space_btn: Locator;
    booked_desk_spot: Locator;
    availableDaysfromcurrunt: Locator;
    realese_space_btn: Locator;
    report_Violation_btn: Locator;
    report_Violation_number_plate: Locator;
    report_Violation_cofirm_check: Locator;
    report_Violation_send_btn: Locator;
    report_Violation_cofirm_btn: Locator;
    report_Violation_no_spot_mesg: Locator;
    report_Violation_no_spot_mesg_close: Locator;
    next_month_button: Locator;
    month_header: Locator;
    check_in_icon: Locator;
    check_out_icon: Locator;
    check_in_out_button: Locator;
    team_member_drp: Locator;
    park_spot_Available: Locator;
    first_park_spot_Available: Locator;
    team_member_drp_map: Locator;
    login_with_gmail_btn: Locator;
    // gmail_Next_btn: Locator;
    // gmail_password_txt: Locator;
    login_with_microsoft_btn: Locator;
    member_login_landing_email_error: Locator;
    pop_up_close_btn: Locator;
    pop_up_x_icon: Locator;
    member_landing_email_label: Locator;
    member_login_as_admin_btn: Locator;
    // term_and_condition_link: Locator;
    member_login_term_and_condition_link: Locator;
    member_login_check_list_text: Locator;
    member_login_h1_text: Locator;
    member_login_p_text: Locator;
    member_login_country_dropdown: Locator;
    member_login_country_dropdown_itm: Locator;
    member_login_country_dropdown_click: Locator;
    member_login_landing_TermAndCondition_error: Locator;
    member_userName_dashboard: Locator;
    member_booking_popup: Locator;
    zoneDropdownCss: Locator;
    map_Layout_Left_Back_btn: Locator;
    map_Layout_Grid_elm: Locator;
    map_Layout_Canvas_elm: Locator;
    map_Layout_Zone_Name_h2: Locator;
    map_Layout_show_booking_checkbox: Locator;
    map_Layout_zoom_value: Locator;
    Map_pop_up_close_btn: Locator;
    Map_pop_up_close_icon: Locator;
    parking_hourly_all_spots: Locator;
    Map_parking_all_spots: Locator;
    parking_allday_all_spots: Locator;
    parking_inactive_all_spots: Locator;
    parking_map_spot_popup: Locator;
    member_hourly_booking_popup: Locator;
    member_hourly_30_booking_start: Locator;
    member_hourly_30_booking_end: Locator;
    parking_map_claim_spot_popup: Locator;
    parking_map_claim_spot_popup_start_time: Locator;
    parking_map_claim_spot_popup_end_time: Locator;
    parking_booked_hourly_spot: Locator;
    parking_realese_hourly_spot: Locator;
    parking_realese_hourly_spot_map: Locator;
    parking_realese_hourly_slots_more_then1: Locator;
    parking_realese_hourly_Booked_user: Locator;
    hourly_Report_Violation_btn: Locator;
    check_first_car_plate: Locator;
    credits_value_elm: Locator;
    credit_message_on_spot: Locator;
    Map_Meeting_all_rooms: Locator;
    meeting_Booking_First_Slot: Locator;
    meeting_Next_Btn: Locator;
    meeting_Name_TextBox: Locator;
    meeting_Repeat_Option_drp: Locator;
    meeting_Note_TextBox: Locator;
    meeting_Search_Participants: Locator;
    meeting_First_Participants: Locator;
    meeting_guest_Participants_btn: Locator;
    add_Guest_Participant_First_name_input: any;
    add_Guest_Participant_Last_name_input: Locator;
    add_Guest_Participant_EmailAddress_input: Locator;
    meeting_guest_Participants_save_btn: Locator;
    add_Guest_Participant_Nationals_input: Locator;
    meeting_Confirm_btn: Locator;
    meeting_Next_Btn2: Locator;
    meeting_Main_Menu: Locator;
    // First_Meeting_Main_Menu: Locator;
    First_Meeting_Cancel: Locator;
    First_Name_Meeting_Main_Menu: Locator;
    // First_Meeting_Cancel_pop_name: Locator;
    Meeting_Cancel_pop_name: Locator;
    Meeting_Cancel_pop_Confirm: Locator;
    // Meeting_Booked_Name: Locator;
    Meeting_Booked_Name_on_Map: Locator;
    Meeting_Scroller: Locator;
    Meeting_Search: Locator;
    Meeting_All_Slots: Locator;
    Meeting_bookingdate: Locator;
    Meeting_enddate: Locator;
    Meeting_EndBy: Locator;
    Meeting_Booked_Room_name_On_Pop: Locator;
    Meeting_Booked_Date_On_Pop: Locator;
    // Meeting_Cancel_pop: Locator;
    Meeting_Cancel_pop_button: Locator;
    Meeting_Day_Label_Tue: Locator;
    Meeting_Repeat_Option: Locator;
    Meeting_End_Date: Locator;
    Meeting_Start_Date: Locator;
    Meeting_Monthly_Week_Day_drp: Locator;
    Meeting_Date_On_Tab: Locator;
    Meeting_Start_Time_On_Tab: Locator;
    Meeting_End_Time_On_Tab: Locator;
    Meeting_Reschedule_Btn: Locator;
    Meeting_Rescheduled_Name: Locator;
    Meeting_Start_Time_Drp_On_PopUp: Locator;
    Meeting_End_Time_Drp_On_PopUp: Locator;
    Meeting_Rescheduled_Confirm_Btn: Locator;
    Meeting_Rescheduled_Booking_Option: Locator;
    add_primary_vehicle_btn: Locator;
    admin_Main_Spaces: Locator;
    admin_Sub_Zones_and_maps: Locator;
    admin_Sub_Parking_spaces: Locator;
    admin_Sub_Add_Parking_spaces_Btn: Locator;
    admin_Add_spot_Zone_dropdown: Locator;
    admin_Aad_spot_input: Locator;
    admin_Add_spot_Vehicle_size_dropdown: Locator;
    selectAllCheckbox_Vehicle_size: Locator;
    admin_Add_spot_Fuel_types_dropdown: Locator;
    selectAllCheckbox_Fuel_types: Locator;
    admin_Sub_Add_Parking_spaces_Complete_Btn: Locator;
    admin_Sub_Desks_spaces: Locator;
    admin_Sub_Add_desk_Btn: Locator;
    admin_Live_View_Default: Locator;
    admin_Live_View_DatePicker_Month_Year: Locator;
    admin_Live_View_DatePicker_Currunt_Active_Date: Locator;
    admin_Live_View_DatePicker: Locator;
    admin_Live_View_Zone_DropDown: Locator;
    admin_All_Available_Spots: Locator;
    admin_All_Booked_Spots: Locator;
    admin_Filter_Elements: Locator;
    admin_Filter_Collapse: Locator;
    admin_Filter_Btn: Locator;
    admin_Filter_Avilable_Icons: Locator;
    admin_Filter_Book_Icons: Locator;
    admin_Filter_Report_Icons: Locator;
    admin_Filter_Waitlist_Icons: Locator;
    admin_First_Available_Spot: Locator;
    admin_Spot_SideBar_Header: Locator;
    admin_Spot_SideBar_Close_Icon: Locator;
    admin_Spot_SideBar_Space_number_input_value: Locator;
    admin_menu_sidebar_open: Locator;
    admin_Sub_Menu_Reports: Locator;
    admin_Sub_Menu_Header: Locator;
    admin_Main_Menu_Bookings: Locator;
    admin_Sub_Menu_Space_Bookings: Locator;
    admin_Sub_Menu_Room_Bookings: Locator;
    admin_Sub_Menu_Scheduler: Locator;
    admin_Sub_Menu_Closing_Dates: Locator;
    admin_Main_Menu_Spaces: Locator;
    admin_Sub_Menu_Zones_and_Maps: Locator;
    admin_Sub_Menu_Parking_Spaces: Locator;
    admin_Sub_Menu_Desks: Locator;
    admin_Sub_Menu_Meeting_Rooms: Locator;
    admin_Sub_Menu_Bulk_Actions: Locator;
    admin_Main_Menu_Users: Locator;
    admin_Sub_Menu_Employees: Locator;
    admin_Sub_Menu_Login_Methods: Locator;
    admin_Sub_Menu_Administrators: Locator;
    admin_Sub_Menu_Group_Settings: Locator;
    admin_Sub_Menu_Team_Permissions: Locator;
    // admin_Sub_Menu_Account: Locator;
    admin_Sub_Menu_General_Settings: Locator;
    admin_Sub_Menu_Email_Templates: Locator;
    admin_Sub_Menu_Notification_Templates: Locator;
    admin_Sub_Menu_Admin_alerts: Locator;
    admin_Sub_Menu_Pre_booking_Questions: Locator;
    admin_Sub_Menu_Post_booking_Questions: Locator;
    admin_Sub_Menu_Integrations: Locator;
    admin_Sub_Menu_Health_and_Safety: Locator;
    admin_Main_Menu_Account: Locator;
    Member_Menu_Search_Bookings: Locator;
    Member_Menu_Search_Bookings_dropdown: Locator;
    member_first_name_text: Locator;
    member_last_name_text: Locator;
    member_zone_dropdown: Locator;
    member_group_dropdown: Locator;
    member_Search_by_name: Locator;
    member_first_Search_Year: Locator;
    member_first_Search_Date: Locator;
    member_first_Search_Spot_Number: Locator;
    admin_contry_dropdown: Locator;
    admin_Main_Menu_Insights: Locator;
    admin_Sub_Menu_Live_view: Locator;
    admin_Sub_Menu_Live_view_Expended: Locator;
    admin_First_Spot_ThreeDots: Locator;
    admin_First_spot_popup_header: Locator;
    admin_spot_popup_edit_button: Locator;
    admin_spot_popup_history_button: Locator;
    admin_spot_second_popup_header: Locator;
    admin_spot_second_popup_Default_employee_button: Locator;
    admin_spot_second_popup_search_user_input: Locator;
    admin_spot_second_popup_vehicle_type_Dropdown: Locator;
    admin_spot_second_popup_BookSpot_button: Locator;
    admin_First_Booked_Spot: Locator;
    admin_First_Booked_Spot_Details_User_name: Locator;
    admin_spot_popup_book_button: Locator;
    admin_All_Booked_Spots_Live: Locator;
    admin_All_Booked_Spot: Locator;
    admin_All_Booked_Spots_Live_Release_Button: Locator;
    admin_First_popup_cross_icon: Locator;
    admin_second_popup_cross_icon: Locator;
    admin_second_popup_cancel_button: Locator;
    admin_second_popup_guest_tab_button: Locator;
    admin_All_Available_Spots_Map: Locator;
    admin_All_Booked_Spots_Map: Locator;
    admin_All_Booked_Spots_Map_Spot_Name: Locator;
    admin_Main_radio_login: Locator;
    admin_Spaces_Zone_and_space_Add_zone_button: Locator;
    admin_Spaces_Zone_and_space_Export_button: Locator;
    admin_Spaces_Zone_and_space_List_all_Zone: Locator;
    admin_Spaces_Zone_and_space_List_all_Zone_count: Locator;
    admin_Spaces_Zone_and_space_List_all_Zone_Active_count: Locator;
    admin_Spaces_Zone_and_space_List_all_Zone_INActive_count: Locator;
    admin_Spaces_Zone_and_space_first_zone_link: Locator;
    admin_Spaces_Zone_and_space_Header_Name: Locator;
    admin_Spaces_Zone_and_space_Zone_search_input: Locator;
    admin_Spaces_Zone_and_space_Zone_First_Edit: Locator;
    admin_Spaces_Zone_and_space_Zone_First_Edit_input_value: Locator;
    admin_Spaces_Zone_Add_zone_Popup: Locator;
    admin_Spaces_Zone_Add_zone_Popup_Close_Button: Locator;
    admin_Spaces_Zone_Add_zone_Popup_text01: Locator;
    admin_Spaces_Zone_Add_zone_Popup_Zone_Name_label: Locator;
    admin_Spaces_Zone_Add_zone_Popup_Zone_Name_input: Locator;
    admin_Spaces_Zone_Add_zone_Popup_Zone_type_label: Locator;
    admin_Spaces_Zone_Add_zone_Popup_Zone_type_input: Locator;
    admin_Spaces_Zone_Add_zone_Popup_Map_type_label: Locator;
    admin_Spaces_Zone_Add_zone_Popup_Map_type_input: Locator;
    admin_Spaces_Zone_Add_zone_Popup_Time_zone_label: Locator;
    admin_Spaces_Zone_Add_zone_Popup_Time_zone_input: Locator;
    admin_Spaces_Zone_Add_zone_toggel: Locator;
    admin_Spaces_Zone_Add_zone_toggel_text: Locator;
    admin_Spaces_Zone_Add_zone_Complete_button: Locator;
    admin_Spaces_Zone_Add_zone_Toggeled_Header_text1: Locator;
    admin_Spaces_Zone_Add_zone_Toggeled_Header_text2: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Zone_Name_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Zone_Name_input: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Zone_Type_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Zone_Type_input: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Map_type_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Map_type_input: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Time_zone_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Time_zone_input: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_file_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_file_input: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Steps: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Zone_Type_input_dropdown: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Map_type_input_dropdown: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Next_button: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Header_Step2: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step2: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Allow_re_booking_after_cancellation_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Allow_re_booking_after_cancellation_input: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Next_button_step2: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step3: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Credit_system_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Credit_system_input: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Next_button_step3: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Back_button_step3: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Booking_cost_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Booking_cost_input: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step3_2: Locator;
    admin_Spaces_Zone_Add_zone_Credit_refund_Cancel_before_label: Locator;
    admin_Spaces_Zone_Add_zone_Credit_refund_Adjust_time_slider_label: Locator;
    admin_Spaces_Zone_Add_zone_Credit_refund_Full_refund_label: Locator;
    admin_Spaces_Zone_Add_zone_Credit_refund_Half_refund_label: Locator;
    admin_Spaces_Zone_Add_zone_Credit_refund_No_refund_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Enable_booking_reminders_button: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Enable_email_reminders_Label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step4: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Disable_booking_reminders_button: Locator;
    admin_Spaces_Zone_Add_zone_ToggledBlock_last_minute_bookings_toggeled: Locator;
    admin_Spaces_Zone_Add_zone_ToggledBlock_last_minute_bookings_label_txt: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step_2: Locator;
    admin_Spaces_Zone_Add_zone_ToggledBlock_last_minute_bookings_input: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Next_button_step4: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step5: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_waitlist_position_label_txt: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_waitlist_position_off_button: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_waitlist_position_on_button: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Disable_booking_reminders_button_2: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Show_bookings_to_users_Label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Show_bookings_to_users_Select: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_random_book_time_type_Select: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Unlock_90th_day_Label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Unlock_90th_day_at_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Unlock_90th_day_at_input: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Next_button_step5: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Administrator_access_label: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Back_button_step6: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Next_button_step6: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Back_button_step5: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Back_button_step4: Locator;
    admin_Spaces_Zone_Add_zone_Toggled_Back_button_step2: Locator;
    admin_Spaces_Spot_Header_Name: Locator;
    admin_Spaces_Spot_General_hover_texts: Locator;
    admin_Spaces_Spot_General_Labels: Locator;
    admin_Spaces_Zone_Active_zone_Toggled_Type_input: Locator;
    admin_Spaces_Zone_type_Dropdown: Locator;
    admin_Spaces_Zone_Map_configuration_Dropdown: Locator;
    admin_Spaces_Zone_Timezone_Dropdown: Locator;
    admin_Spaces_Zone_Update_button: Locator;
    admin_Spaces_Zone_Cancel_button: Locator;
    admin_Spaces_Zone_type_Dropdown_2: Locator;
    admin_Wifi_Checking_Add_Integration_Button: Locator;
    admin_Wifi_Checking_Integration_List: Locator;
    admin_Wifi_Checking_Integration_Header: Locator;
    admin_Wifi_Checking_Integration_Close_Button: Locator;
    admin_Wifi_Checking_Integration_Wifi_button: Locator;
    admin_Wifi_Checking_Integration_form1_label: Locator;
    admin_Wifi_Checking_Integration_form1_type_input: Locator;
    admin_Wifi_Checking_Integration_form1_name_input: Locator;
    admin_Wifi_Checking_Integration_form1_status_dropdown: Locator;
    admin_Wifi_Checking_Integration_form1_cancel_button: Locator;
    admin_Wifi_Checking_Integration_form1_submit_button: Locator;
    admin_Wifi_Checking_Integration_form1_name_Blank_error_message: Locator;
    admin_Wifi_Checking_Integration_Search_Box: Locator;
    admin_Wifi_Checking_Integration_First_Row_Name: Locator;
    admin_Wifi_Checking_Integration_Disabled_Button: Locator;
    admin_Wifi_Checking_Integration_Delete_Button_on_Popup: Locator;
    admin_Wifi_Checking_Integration_Delete_Button_first_integration: Locator;
    admin_Wifi_Checking_Integration_ACTpro_button: Locator;
    admin_Wifi_Checking_Integration_Duplicate_Error_Message: Locator;
    admin_Wifi_Checking_Integration_Table_Label: Locator;
    admin_Wifi_Checking_Integration_First_Row_Type: Locator;
    admin_Wifi_Checking_Integration_First_Row_Status: Locator;
    admin_Wifi_Checking_Integration_Wifi_Button_first_integration: Locator;
    admin_Wifi_Checking_Integration_Wifi_Edit_first_integration: Locator;
    admin_Wifi_Checking_Step2_Aerrow_icon: Locator;
    admin_Wifi_Checking_Step2_Header_text: Locator;
    admin_Wifi_Checking_Step2_Header_text_2: Locator;
    admin_Wifi_Checking_Step2_Wifi_img: Locator;
    admin_Wifi_Mapping_Header_text: Locator;
    admin_Wifi_default_selected_Mapping_type: Locator;
    admin_Wifi_default_selected_Mapping_List: Locator;
    admin_Wifi_default_selected_Mapping_List_text: Locator;
    admin_Wifi_Mapping_Next_btn: Locator;
    admin_Wifi_Mapping_Cancel_btn: Locator;
    admin_Wifi_Mapping_Add_another_btn: Locator;
    admin_Wifi_Mapping_Name_label: Locator;
    admin_Wifi_Mapping_Name_input: Locator;
    admin_Wifi_Zone_association_label: Locator;
    admin_Wifi_Zone_association_input: Locator;
    admin_Wifi_network_name_label: Locator;
    admin_Wifi_network_name_input: Locator;
    admin_Wifi_Zone_association_Hover_text: Locator;
    admin_Wifi_network_name_Hover_text: Locator;
    admin_Wifi_Zone_association_inputClick: Locator;
    admin_Wifi_network_Apply_Button: Locator;
    admin_Wifi_network_Cancel_Button: Locator;
    admin_Wifi_Created_Mapping_Name: Locator;
    admin_Wifi_Checking_Mapping_Duplicate_Error_Message: Locator;
    admin_Wifi_Checking_Mapping_Delete_button: Locator;
    admin_Wifi_network_name_input_2: Locator;
    admin_Wi_Fi_network_name_Button: Locator;
    admin_Wi_Fi_network_Name_second_text: Locator;
    admin_BSSID_name_label: Locator;
    admin_Wifi_network_BSSID_Hover_text: Locator;
    admin_Wifi_BSSID_input: Locator;
    admin_Wifi_Created_Mapping_Name_2: Locator;
    admin_Wifi_Mapping_BSSID_Add_another_btn: Locator;
    admin_Wifi_BSSID_input_2: Locator;
    admin_Wi_Fi_network_name_Button_2: Locator;
    admin_Wi_Fi_BSSID_network_Name_second_text: Locator;
    admin_Space_zone_Checkin_tab: Locator;
    admin_Space_zone_Checkin_tab_checkin_type_label: Locator;
    admin_Space_zone_Checkin_tab_checkin_Tab_Submit_Button: Locator;
    admin_Space_zone_Checkin_tab_checkin_Tab_dropdown_Button: Locator;
    admin_Space_zone_Display_Tab_Button: Locator;
    admin_Space_zone_Display_map_zoom_level_Scroller: Locator;
    admin_Spaces_Spot_Display_Labels: Locator;
    admin_Spaces_Spot_Display_hover_texts: Locator;
    admin_Spaces_Zone_Display_colour_Dropdown: Locator;
    admin_Spaces_Zone_Display_position_Toggle: Locator;
    admin_Spaces_Map_Fontsize_Input: Locator;
    admin_Spaces_Map_Fontsize_Plus_Button: Locator;
    admin_Spaces_Map_Fontsize_Minus_Button: Locator;
    admin_Spaces_Zone_Display_File_Upload: Locator;
    admin_Space_zone_Reminders_Tab_Button: Locator;
    admin_Spaces_Spot_Reminder_hover_texts: Locator;
    admin_Spaces_Spot_Reminder_Labels: Locator;
    admin_Spaces_Spot_Reminder_Column_Header: Locator;
    admin_Spaces_hourlyBookings_SendReminders_Dropdown: Locator;
    admin_Spaces_dailyBookings_SendReminders_Dropdown: Locator;
    admin_Spaces_scheduledBookings_SendReminders_Dropdown: Locator;
    admin_Spaces_hourlyBookings_ReminderFrequency_Dropdown: Locator;
    admin_Spaces_dailyBookings_ReminderFrequency_Dropdown: Locator;
    admin_Spaces_scheduledBookings_ReminderFrequency_Dropdown: Locator;
    admin_Spaces_hourlyBookings_Remindertime_Dropdown: Locator;
    admin_Spaces_dailyBookings_Remindertime_input: Locator;
    admin_Spaces_scheduledBookings_Remindertime_input: Locator;
    admin_Spaces_hourly_ConfirmationRequiredInReminder_toggle: Locator;
    admin_Spaces_daily_ConfirmationRequiredInReminder_toggle: Locator;
    admin_Spaces_scheduled_daily_ConfirmationRequiredInReminder_toggle: Locator;
    admin_Spaces_hourlyBookings_ConfirmationRequiredWithin_Dropdown: Locator;
    admin_Spaces_dailyBookings_ConfirmationRequiredWithin_Dropdown: Locator;
    admin_Spaces_scheduledBookings_ConfirmationRequiredWithin_Dropdown: Locator;
    admin_Spaces_daily_BookingEndReminder_toggle: Locator;
    admin_Spaces_dailyBookings_BookingEndReminderTime_Dropdown: Locator;
    admin_Spaces_Spot_Credit_Labels: Locator;
    admin_Spaces_Spot_Credit_Tab_Button: Locator;
    admin_Spaces_Spot_Credit_hover_texts: Locator;
    admin_Spaces_credit_system_check_toggle: Locator;
    admin_Spaces_Booking_Cost_Dropdown: Locator;
    admin_Wi_Fi_network_BSSID_name_Button: Locator;
    admin_zone_credit_slider_1: Locator;
    admin_Spaces_CreditRefundDuringCurrentRefill_toggle: Locator;
    admin_Spaces_Spot_checkin_hover_texts: Locator;
    admin_Spaces_Spot_checkin_Labels: Locator;
    admin_Spaces_Spot_Checkin_Column_Header: Locator;
    admin_Spaces_hourly_hourlyCheckInReminder_toggle: Locator;
    admin_Spaces_daily_dailyCheckInReminder_toggle: Locator;
    admin_Spaces_scheduledCheckInReminder_toggle: Locator;
    admin_Spaces_hourlyCheckInReminderTime_Dropdown: Locator;
    admin_Spaces_dailyCheckInReminderTimeText_input: Locator;
    admin_Spaces_scheduledCheckInReminderTimeText_input: Locator;
    admin_Spaces_hourlyAutoRelease_toggle: Locator;
    admin_Spaces_dailyAutoReleaser_toggle: Locator;
    admin_Spaces_scheduledAutoRelease_toggle: Locator;
    admin_Spaces_hourlyAutoReleaseAfter_Dropdown: Locator;
    admin_Spaces_daily_dailyCheckInReminder_Dropdown: Locator;
    admin_Spaces_scheduledCheckInReminder_Dropdown: Locator;
    admin_Space_zone_Advanced_Settings_tab_label: Locator;
    admin_Space_zone_Advanced_Settings_tab_label_first: Locator;
    admin_Spaces_Spot_Advanced_Settings_Hover_Texts: Locator;
    admin_Space_zone_Advanced_Settings_tab_button: Locator;
    admin_Space_zone_Advanced_Settings_AllowLiftRestriction_toggle: Locator;
    admin_Space_zone_Advanced_Settings_Swipecardaccess_toggle: Locator;
    admin_Space_zone_Advanced_Settings_new_bookable_day_respects_office_closures_toggle: Locator;
    admin_Space_zone_Advanced_Settings_minimum_advance_reservation_check_toggle: Locator;
    admin_Space_zone_Advanced_Settings_daily_booking_limit_check_toggle: Locator;
    admin_Space_zone_Advanced_Settings_SocialDistancing_toggle: Locator;
    admin_Space_zone_Advanced_Settings_FlgInstanceRelease_Dropdown: Locator;
    admin_Space_zone_Advanced_Settings_randomBookTimeType_Dropdown: Locator;
    admin_Space_zone_Advanced_Settings_randomBookTime_input: Locator;
    admin_Space_zone_Advanced_Settings_NoBookingsBefore_Dropdown: Locator;
    admin_Space_zone_Privacy_tab_button: Locator;
    admin_Space_zone_Privacy_tab_label_first: Locator;
    admin_Space_zone_Privacy_tab_label: Locator;
    admin_Space_zone_Privacy_tab_label_Hover: Locator;
    admin_Space_zone_Privacy_tab_BookingsViewableByStaff_Dropdown: Locator;
    admin_Space_zone_Privacy_tab_AccessToSearchAllZones_toggle: Locator;
    admin_Space_zone_Advanced_Settings_DailyBookingLimit_input: Locator;
    admin_Parking_Spaces_zone_id_Dropdown: Locator;
    admin_Parking_Spaces_Header_text: Locator;
    admin_Parking_Spaces_Add_Parking_Space_Button: Locator;
    admin_Parking_Spaces_Add_Parking_Space_Popup: Locator;
    admin_Parking_Spaces_Add_Parking_Space_Popup2: Locator;
    admin_Parking_Spaces_Add_Parking_Space_Popup3: Locator;
    admin_Parking_Spaces_Add_Parking_Space_popup_label: Locator;
    admin_Parking_Spaces_car_park_id_Dropdown: Locator;
    admin_Parking_Spaces_parking_number_input: Locator;
    admin_Parking_Spaces_name_filter_input: Locator;
    admin_Parking_Spaces_Edit_Parking_Space_Button_first: Locator;
    admin_Parking_Spaces_Created_parking_spot_first: Locator;
    admin_Spot_SideBar_Space_number_input_value_2: Locator;
    admin_Spot_SideBar_Space_number_label: Locator;
    admin_Spot_SideBar_Space_size_label: Locator;
    admin_Spot_SideBar_Fuel_types_label: Locator;
    admin_Spot_SideBar_Accessibility_label: Locator;
    admin_Spot_SideBar_Vehicle_sharing_label: Locator;
    admin_Spot_SideBar_Ranking_value_label: Locator;
    admin_Spot_SideBar_Available_days_label: Locator;
    admin_Spot_SideBar_Available_from_label: Locator;
    admin_Spot_SideBar_Booking_period_label: Locator;
    admin_Spot_SideBar_Status_label: Locator;
    admin_Spot_SideBar_Restrict_bookings_by_users_label: Locator;
    admin_Spot_SideBar_Space_number_hover: Locator;
    admin_Spot_SideBar_Space_size_hover: Locator;
    admin_Spot_SideBar_Accessibility_hover: Locator;
    admin_Spot_SideBar_Fuel_types_hover: Locator;
    admin_Spot_SideBar_Ranking_value_hover: Locator;
    admin_Spot_SideBar_Vehicle_sharing_hover: Locator;
    admin_Spot_SideBar_Available_days_hover: Locator;
    admin_Spot_SideBar_Available_from_hover: Locator;
    admin_Spot_SideBar_Booking_period_hover: Locator;
    admin_Spot_SideBar_Status_hover: Locator;
    admin_Spot_SideBar_Restrict_bookings_by_users_hover: Locator;
    admin_Spot_SideBar_Close_button: Locator;
    admin_Spot_SideBar_Submit_button: Locator;
    admin_Spot_SideBar_Select_All_button: Locator;
    admin_Spot_SideBar_Select_All_checkbox: Locator;
    admin_Parking_Spaces_Delete_Parking_Space_Button_first: Locator;
    admin_Parking_Spaces_Cancel_input_text_button: Locator;
    admin_Spot_SideBar_Confirm_deleted_button: Locator;
    succsessMessageAdmin: Locator;
    admin_Spot_SideBar_Fuel_Types_Select_All_button: Locator;
    admin_Spot_SideBar_Fuel_Types_Select_All_checkbox: Locator;
    admin_Spot_SideBar_Accessibility_Select_All_button: Locator;
    admin_Spot_SideBar_Accessibility_Select_All_checkbox: Locator;
    admin_Spot_SideBar_Shareable_Select_All_button: Locator;
    admin_Spot_SideBar_Shareable_Select_All_checkbox: Locator;
    admin_Spot_SideBar_Ranking_value_Input: Locator;
    admin_Spot_SideBar_Available_days_Input: Locator;
    admin_Spot_SideBar_Available_from_Input: Locator;
    admin_Spot_SideBar_Booking_period_radio: Locator;
    admin_Spot_SideBar_All_day_radio: Locator;
    admin_Spot_SideBar_Hourly_radio: Locator;
    admin_Spot_SideBar_Status_dropdown: Locator;
    admin_Spot_SideBar_Restrict_bookings_by_users_toggle: Locator;
    admin_Spot_Desk_Add_desk_button: Locator;
    admin_Spot_Desk_Add_desk_Popup_header_text: Locator;
    admin_Spot_Desk_Add_desk_Popup_header_text2: Locator;
    admin_Spot_Desk_Add_desk_Meeting_Room_button: Locator;
    admin_Spot_Add_Meeting_Popup_header_text: Locator;
    admin_Spot_Add_Meeting_Popup_label: Locator;
    admin_Spot_Add_Meeting_Popup_capacity_input: Locator;
    admin_Spot_Add_Meeting_Popup_room_name_input: Locator;
    admin_Spot_Add_Meeting_Popup_room_name_input_room_name: Locator;


    admin_Spot_SideBar_Room_name_label: Locator;
    admin_Spot_SideBar_Room_capacity_label: Locator;
    admin_Spot_SideBar_Available_days_label_2: Locator;
    admin_Spot_SideBar_Room_available_time_label: Locator;
    admin_Spot_SideBar_Start_booking_time_label: Locator;
    admin_Spot_SideBar_End_booking_time_label: Locator;
    admin_Spot_SideBar_Restrict_booking_duration_label: Locator;
    admin_Spot_SideBar_External_bookings_via_email_label: Locator;
    admin_Spot_SideBar_Status_label_2: Locator;
    admin_Spot_SideBar_Require_organiser_check_in_label: Locator;
    admin_Spot_SideBar_Restrict_bookings_by_users_label_2: Locator;
    admin_Spot_SideBar_Require_meeting_approval_label: Locator;

    admin_Spot_SideBar_Room_name_hover: Locator;
    admin_Spot_SideBar_Room_capacity_hover: Locator;
    admin_Spot_SideBar_Available_days_hover_2: Locator;
    admin_Spot_SideBar_Room_available_time_hover: Locator;
    admin_Spot_SideBar_Start_booking_time_hover: Locator;
    admin_Spot_SideBar_End_booking_time_hover: Locator;
    admin_Spot_SideBar_Restrict_booking_duration_hover: Locator;
    admin_Spot_SideBar_External_bookings_via_email_hover: Locator;
    admin_Spot_SideBar_Status_hover_2: Locator;
    admin_Spot_SideBar_Require_organiser_check_in_hover: Locator;
    admin_Spot_SideBar_Restrict_bookings_by_users_hover_2: Locator;
    admin_Spot_SideBar_Require_meeting_approval_hover: Locator;
    admin_Spot_SideBar_Restrict_booking_duration_toggle: Locator;
    admin_Spot_SideBar_Restrict_booking_duration_slot: Locator;
    admin_Spot_SideBar_Require_organiser_check_in_check_box: Locator;
    admin_Spot_SideBar_Require_organiser_check_in_check_box_2: Locator;

    admin_Spot_SideBar_QR_code_label: Locator;
    admin_Spot_SideBar_Check_in_reminder_label: Locator;
    admin_Spot_SideBar_Check_in_reminder_time_label: Locator;
    admin_Spot_SideBar_Auto_release_label: Locator;
    admin_Spot_SideBar_Auto_release_after_label: Locator;

    admin_Spot_SideBar_QR_code_hover: Locator;
    admin_Spot_SideBar_Check_in_reminder_hover: Locator;
    admin_Spot_SideBar_Check_in_reminder_time_hover: Locator;
    admin_Spot_SideBar_Auto_release_hover: Locator;
    admin_Spot_SideBar_Auto_release_after_hover: Locator;
    admin_Spot_SideBar_Check_in_reminder_check_toggle: Locator;
    admin_Spot_SideBar_Check_in_reminder_time_dropdown: Locator;
    admin_Spot_SideBar_Auto_release_after_dropdown: Locator;
    admin_Spot_SideBar_Auto_release_check_toggle: Locator;
    admin_Spot_SideBar_Configure_button: Locator;
    admin_Spot_SideBar_Status_modal: Locator;
    admin_Spot_SideBar_Status_modal_text: Locator;
    admin_Spot_SideBar_Date_input: Locator;
    admin_Spot_SideBar_Cancel_button: Locator;
    admin_Spot_SideBar_Restrict_bookings_by_users_button: Locator;
    admin_Spot_SideBar_Enable_Day_Restrictions_Checkbox: Locator;
    admin_Spot_SideBar_Restriction_Cancel_Button: Locator;
    admin_Spot_SideBar_Restrict_Bookings_By_Users_Toggle: Locator;
    admin_Spot_SideBar_Approval_Needed_Checkbox: Locator;
    admin_Spot_SideBar_Approval_Needed_Edit_Button: Locator;
    admin_Spot_SideBar_Approval_Needed_Modal_Header: Locator;
    admin_User_Tab_Email_Filter_Input: Locator;
    admin_User_Tab_View_More_Button: Locator;
    admin_User_Tab_Clear_All_Bookings_Button: Locator;
    admin_User_Tab_Clear_All_Bookings_Modal_Header: Locator;
    admin_Logutut_btn: Locator;
    admin_User_Tab_Employee_Add_Employee_Button: Locator;
    admin_User_Tab_Employee_Add_Employee_form_labels: Locator;
    admin_User_Tab_Employee_Add_Employee_form_PrimaryEmail_Input: Locator;
    admin_User_Tab_Employee_Add_Employee_form_FirstName_Input: Locator;
    admin_User_Tab_Employee_Add_Employee_form_LastName_Input: Locator;
    admin_User_Tab_Employee_Add_Employee_form_Password_Input: Locator;
    admin_User_Tab_Employee_Add_Employee_form_Group_Select: Locator;
    admin_User_Tab_Employee_Add_Employee_form_Zone_Select: Locator;
    admin_User_Tab_Employee_Add_Employee_form_NotifyRegUser_Checkbox: Locator;
    admin_User_Tab_Employee_Add_Employee_form_Add_Button: Locator;
    admin_User_Tab_Employee_Add_Employee_form_Cancel_Button: Locator;
    admin_User_Tab_Employee_Add_Employee_form_Upload_Button: Locator;
    admin_User_Tab_Employee_Add_Employee_form_Export_Button: Locator;
    admin_User_Tab_Employee_Add_Employee_form_Export_Modal_Header: Locator;
    admin_User_Tab_Employee_Add_Employee_form_Export_Modal_Text: Locator;
    admin_User_Tab_Employee_Export_Employee_Button: Locator;
    admin_User_Tab_Employee_Export_Employee_Form_Close_Button: Locator;
    admin_User_Tab_Employee_Export_Employee_Form_Email_Label: Locator;
    admin_Add_Admin_First_Name_Label: Locator;
    admin_Add_Admin_Last_Name_Label: Locator;
    admin_Add_Admin_Multifactor_Authentication_Label: Locator;
    admin_Add_Admin_Permission_Level_Label: Locator;
    admin_Add_Admin_Zone_Label: Locator;
    admin_Add_Admin_Password_Label: Locator;
    admin_Add_Admin_New_User_Signup_Alerts_Label: Locator;
    admin_User_Tab_Admin_Add_Admin_Button: Locator;
    admin_Add_Admin_Email_Input: Locator;
    admin_Add_Admin_First_Name_Input: Locator;
    admin_Add_Admin_Last_Name_Input: Locator;
    admin_Add_Admin_Multifactor_Authentication_Input: Locator;
    admin_Add_Admin_Permission_Level_Input: Locator;
    admin_Add_Admin_Zone_Input: Locator;
    admin_Add_Admin_Password_Input: Locator;
    admin_Add_Admin_New_User_Signup_Alerts_Input: Locator;
    admin_Add_Admin_Zone_Input_Click: Locator;
    admin_Add_Admin_Zone_Input_Multiselect_All: Locator;
    admin_Add_Admin_Close_Button: Locator;
    admin_Add_Admin_Submit_Button: Locator;
    admin_Add_Admin_Submit_Button_Header_text: Locator;
    admin_Add_Admin_Domain_Input: Locator;
    admin_Add_Admin_Domain_Input_Update_Button: Locator;
    admin_Add_Admin_Add_Group_Button: Locator;
    admin_Add_Admin_Add_Group_Button_Header_Text: Locator;


    admin_Add_Group_Name_Label: Locator;
    admin_Add_Group_Default_Zone_Label: Locator;
    admin_Add_Group_Available_Days_Label: Locator;
    admin_Add_Group_Join_Waitlist_Label: Locator;
    admin_Add_Group_Daily_Booking_Limit_Label: Locator;
    admin_Add_Group_Credit_Refill_Label: Locator;
    admin_Add_Group_Credit_Refill_Cycle_Label: Locator;
    admin_Add_Group_Default_Credit_Balance_Label: Locator;

    admin_Add_Group_Name_Hover: Locator;
    admin_Add_Group_Default_Zone_Hover: Locator;
    admin_Add_Group_Available_Days_Hover: Locator;
    admin_Add_Group_Join_Waitlist_Hover: Locator;
    admin_Add_Group_Daily_Booking_Limit_Hover: Locator;
    admin_Add_Group_Credit_Refill_Hover: Locator;
    admin_Add_Group_Credit_Refill_Cycle_Hover: Locator;
    admin_Add_Group_Default_Credit_Balance_Hover: Locator;
    admin_Add_Group_Name_Input: Locator;
    admin_Add_Group_Default_Zone_Select: Locator;
    admin_Add_Group_Available_Days_Input: Locator;
    admin_Add_Group_Queue_User_Select: Locator;
    admin_Add_Group_Booking_Limit_Input: Locator;
    admin_Add_Group_Credit_Refill_Input: Locator;
    admin_Add_Group_Default_Credit_Balance_Input: Locator;
    admin_Add_Group_Credit_Refill_Cycle_Select: Locator;
    admin_Add_Group_Submit_Button: Locator;
    admin_Add_Group_Cancel_Button: Locator;
    admin_Add_Group_Name_Filter_Input: Locator;
    admin_Created_Group_Button_First: Locator;
    admin_Delete_Group_Button_First: Locator;
    admin_Delete_Group_Confirm_Button: Locator;
    admin_Add_Teame_Name_Input: Locator;
    admin_Add_Team_Button: Locator;
    admin_Add_Teame_Name_popuo: any;
    admin_Add_Teame_Name_popuo_header: Locator;
    admin_Add_Teame_Name_popuo_header_add_button: Locator;
    admin_Edit_Team_Delete_Button_First: Locator;
    admin_Team_Name_Filter_Input: Locator;
    admin_Team_Delete_Button: Locator;
    admin_Group_Team_Members_Count_Link: Locator;
    admin_Group_Team_Members_Edit_Header_Text: Locator;
    admin_Group_Team_Members_Edit_Status_Checkbox: Locator;
    admin_Group_Team_Members_Edit_CheckBox_search: Locator;
    admin_Add_Role_Button: Locator;
    admin_Add_Role_Name_Input: Locator;
    admin_Add_Role_Popup_Header: Locator;
    admin_Add_Role_Select_icon: Locator;
    admin_Add_Role_Input: Locator;
    admin_Add_Role_Select_icon_No_employee_first: Locator;
    admin_Add_Role_Select_icon_No_employee_first_Header: Locator;
    admin_Add_Role_Select_icon_No_employee_first_Input: Locator;
    admin_Add_Role_Select_icon_No_employee_first_Checkbox: Locator;
    admin_Add_Role_Select_icon_No_employee_first_Close_Button: Locator;
    admin_Add_Role_Select_icon_No_employee_first_Cancel_Button_text: Locator;
    admin_Emergency_Role_Delete_Button: Locator;
    admin_Accounts_general_settings_tabs: Locator;
    admin_Accounts_general_Company_settings_Company_name_labels: Locator;
    admin_Accounts_general_Company_settings_Time_zone_labels: Locator;
    admin_Accounts_general_Company_settings_Default_language_labels: Locator;
    admin_Accounts_general_Company_settings_Support_email_address_labels: Locator;
    admin_Accounts_general_Company_settings_Rectangular_logo_labels: Locator;
    admin_Accounts_general_Company_settings_Square_logo_labels: Locator;
    admin_Accounts_general_Company_settings_Company_name_hover: Locator;
    admin_Accounts_general_Company_settings_Time_zone_hover: Locator;
    admin_Accounts_general_Company_settings_Default_language_hover: Locator;
    admin_Accounts_general_Company_settings_Support_email_address_hover: Locator;
    admin_Accounts_general_Company_settings_Rectangular_logo_hover: Locator;
    admin_Accounts_general_Company_settings_Square_logo_hover: Locator;
    admin_Accounts_general_Company_settings_Company_name_input: Locator;
    admin_Accounts_general_Company_settings_Time_zone_input: Locator;
    admin_Accounts_general_Company_settings_Default_language_input: Locator;
    admin_Accounts_general_Company_settings_Rectangular_logo_input: Locator;
    admin_Accounts_general_Company_settings_Square_logo_input: Locator;
    admin_Accounts_general_Employee_settings_labels: Locator;
    admin_Accounts_general_Employee_settings_hover: Locator;
    admin_Accounts_general_Employee_settings_input: Locator;
    admin_Accounts_general_Employee_settings_Disable_Access_Car_Plate_input: Locator;
    admin_Accounts_general_Employee_settings_IsSessionATimeoutRequired_input: Locator;
    admin_Accounts_general_Employee_settings_Save_button: Locator;
    admin_Accounts_general_Group_zones_popup_header_text: Locator;
    admin_Accounts_general_Group_zones_popup_group_type_select: Locator;
    admin_Accounts_select_MultipleZone: Locator;
    admin_Accounts_select_ZoneToGroup: Locator;
    admin_Accounts_general_Group_zones_add_groupButton: Locator;
    admin_Accounts_general_Group_zones_popup_group_name_input: Locator;
    admin_Accounts_general_Group_zones_popup_restrict_employee_single_booking_input: Locator;
    admin_Accounts_general_Group_zones_popup_group_name_label: Locator;
    admin_Accounts_general_Group_zones_popup_restrict_employee_booking_label: Locator;
    admin_Accounts_general_Group_zones_popup_confirm_button: Locator;
    admin_Accounts_general_Group_zones_created_group_first: Locator;
    admin_Accounts_general_Group_zones_delete_button: Locator;
    admin_Accounts_general_Security_questions_add_question_button: Locator;
    admin_Accounts_general_Security_questions_add_admin_alert_sidebar_header: Locator;
    admin_Accounts_general_Security_questions_add_admin_alert_sidebar_zone_name_label: Locator; admin_Accounts_general_Security_questions_add_admin_alert_sidebar_zone_name_input: Locator;
    admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Alert_type_input: Locator;
    admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Email_Template_label: Locator;
    admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Email_Template_input: Locator;
    admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Alert_preview_label: Locator;
    admin_Accounts_alert_sidebar_Alert_preview_text: Locator;
    admin_Accounts_alert_sidebar_Email_Subject_text: Locator;
    admin_Accounts_alert_sidebar_Email_Content_text: Locator;
    admin_Accounts_alert_sidebar_Add_Recipients_label: Locator;
    admin_Accounts_alert_sidebar_Email_address_1_Label: Locator; admin_Accounts_alert_sidebar_Email_address_1_Input: Locator;
    admin_Accounts_alert_sidebar_Email_add_Button: Locator;
    admin_Accounts_alert_sidebar_Email_address_1_input: Locator;
    admin_Accounts_alert__Delete_Button: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_header: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_labels: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_topic_input: Locator;

    admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Alert_type_label: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_editor_area: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_zone_select: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_zone_button: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_status_select: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_add_button: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_mandatory_checkbox_2: Locator;
    admin_Accounts_question_filter_input: Locator;
    admin_Edit_Button_First: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_update_button: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_delete_button: Locator;
    admin_Accounts_general_Security_Post_questions_add_question_new_button_header: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_question_input: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_ans_required_toggle: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_ans_type_select: Locator;
    admin_Accounts_general_Security_questions_add_question_new_button_ans_input: Locator;
    admin_Accounts_add_post_question_new_button_add_button: Locator;
    admin_Reports_Tabale_Headers: Locator;
    admin_Reports_Export_Button: Locator;
    admin_Reports_Date_Range_Input: Locator;
    admin_Reports_Date_Range_Option: Locator;
    admin_Reports_firstRowCells: Locator;
    admin_Reports_export: Locator;
    morningCancellationsExportCSVButton: Locator;
    admin_Reports_Parking_Free_Booking_Report_Select: Locator;
    EmergencyRolesExportCSVButton: Locator;
    RoomUsageExportCSVButton: Locator;
    unusedBookingExportCSVButton: Locator;
    bookingdemandexportCSVButton: Locator;
    CheckInExportCSVButton: Locator;
    exportCSVButton: Locator;
    pastBookingStaffExportCSVButton: Locator;
    okButton: Locator;
    TimeLoader: Locator;
    oktaContinueButton: Locator;
    floatingFilterText: Locator;
    admin_Hourly: Locator;

    constructor(public page: Page) {
        this.username_text_box = this.page.locator("//input[@name='usernameAdmin']");
        this.password_text_box = this.page.locator("//input[@name='passwordAdmin']");
        this.sign_in = this.page.locator("//button[@id='btnAdminLogin']");
        this.menu_side_bar = this.page.locator("//div[@id='btn']");
        this.icon_admin_btn = this.page.locator("//a[@id='dropdownMenuButton1']")
        this.admin_Logutut_btn = this.page.locator("//span[text()='Sign out']");

        /** Member Locators */

        //Group 1 Locators
        this.member_email_text = this.page.locator("//input[@id='email']")
        this.member_confirm_btn = this.page.locator("//button[@id='emailConfirmButton']")
        this.continue_with_email_btn = this.page.locator("//span[contains(text(),'Continue with Email')]");
        this.member_password_text_box = this.page.locator("//input[@id='password']");
        this.member_signIn_button = this.page.locator("//button[@id='loginBtn']")
        this.member_dashboard_text = this.page.locator("//span[contains(text(),'Dashboard')]")
        this.member_radio_button = this.page.locator("//div[@class='check-border']")
        this.zone_dropdown = this.page.locator("//select[@id='car_park_calendar']")
        this.member_setting_menu = this.page.locator("//span[@id='settings_span']")
        this.member_general_setting_menu = this.page.locator("//a[contains(text(),'General settings')]")
        this.car_plates = this.page.locator("//input[@name='primary_vechicle[]']")
        this.check_first_car_plate = this.page.locator("(//input[@name='primary_vechicle[]'])[1]")
        this.add_vehicle_icon = this.page.locator("//i[@id='add_primary']")
        this.select_vehicle_size = this.page.locator("//div[@id='primary_div']//div[2]//select")
        this.select_vehicle_Fuel = this.page.locator("//div[@id='primary_div']//div[3]//select")
        this.select_vehicle_accessibility = this.page.locator("//div[@id='primary_div']//div[4]//select")
        this.select_vehicle_sharing = this.page.locator("//div[@id='primary_div']//div[5]//select")
        this.update_setting_button = this.page.locator("//button[@id='update_setting']")
        this.refreshButton = this.page.locator("//i[@class='fa fa-refresh']");
        this.availableDays = this.page.locator("//i[contains(@class,'fa-circle')]");
        this.notAvailableDays = this.page.locator("//i[contains(@class, 'fa-ban')]");
        this.availableFirstDaysForBooking = this.page.locator("(//i[contains(@class, 'fa-circle')])[1]");
        this.availableFirstDaysForBookingDate = this.page.locator("(//i[contains(@class, 'fa-circle')])[1]//parent::a");
        this.selectVehicleDropdown = this.page.locator("//select[@id='vehicletype']")
        this.getRandomSpaceButton = this.page.locator("//button[contains(text(),'GET RANDOM SPACE')]")
        this.succsessMessage = this.page.locator("//div[contains(@class, 'gritter-with-image')]/p")
        this.succsessMessageAdmin = this.page.locator("//div[contains(@id, 'gritter-status')]")
        this.bookedSpot = this.page.locator("(//span[contains(text(),'Edit booking')]/preceding-sibling::a)[1]")
        this.meeting_Room_First = this.page.locator("(//div[contains(@class, 'SpotID_blank') and contains(@class, 'facing_MTROOM')])[1]")
        this.desk_spot_First = this.page.locator("(//div[contains(@class,'SpotID_blank') and contains(@class,'facing')])[1]")
        this.goto_map_btn = this.page.locator("//div[@class='pick_from_map_ctm']//a[contains(text(),'Go to Map')]")
        this.meeting_Room_Available = this.page.locator("//div[contains(@class, 'SpotID_blank') and contains(@class, 'facing_MTROOM')]")
        this.desk_spot_Available = this.page.locator("//div[contains(@class,'SpotID_blank') and contains(@class,'facing_F')]")
        this.park_spot_Available = this.page.locator("//div[contains(@class,'SpotID_blank')]")
        this.first_park_spot_Available = this.page.locator("(//div[contains(@class,'SpotID_blank')])[1]")
        this.book_space_btn = this.page.locator("//button[@id='claim_SpotID']")
        this.booked_desk_spot = this.page.locator("//div[contains(@class,'SpotID_assigned') and contains(@class,'facing')]")
        this.currunt_booking_book_space_btn = this.page.locator("//input[@id='select_bookingdate']")
        this.availableDaysfromcurrunt = this.page.locator("//i[contains(@class,'fa-circle')]/parent::a");
        this.realese_space_btn = this.page.locator("//button[@id='release_SpotID']")
        this.report_Violation_btn = this.page.locator("//button[@id='claimParkingViolation']")
        this.report_Violation_number_plate = this.page.locator("//input[@id='plate_no']")
        this.report_Violation_send_btn = this.page.locator("//button[@id='report_violation']")
        this.report_Violation_cofirm_check = this.page.locator("//input[@id='screen_3_checkbox']")
        this.report_Violation_cofirm_btn = this.page.locator("//button[@id='screen_3_ok']")
        this.report_Violation_no_spot_mesg = this.page.locator("(//p[@id='no_spotID']//strong)[2]")
        this.report_Violation_no_spot_mesg_close = this.page.locator("(//button[@id='screen_3_cancel'])[2]")
        this.next_month_button = this.page.locator("//div[@class='fc-right']//button")
        this.month_header = this.page.locator("//div[@class='fc-center']//h2")
        this.check_in_icon = this.page.locator('//img[@src="https://staging.ronspot.ie/assets/img/checkin.png"]')
        this.check_out_icon = this.page.locator('//img[@src="https://staging.ronspot.ie/assets/img/checkout.png"]')
        this.check_in_out_button = this.page.locator("//div[@id='checkindataspotlevel']//div")
        this.team_member_drp = this.page.locator("//select[@id='employee_id']")
        this.team_member_drp_map = this.page.locator("//select[@id='empgrpname']")
        this.pop_up_close_btn = this.page.locator("//button[contains(@class, 'close_modal float-end')]")
        this.pop_up_x_icon = this.page.locator("(//button[contains(@class, 'close close_modal')])[1]")
        this.zoneDropdownCss = this.page.locator('select#car_park_calendar');
        this.map_Layout_Left_Back_btn = this.page.locator("//i[contains(@class, 'fa-arrow-left')]");
        this.map_Layout_Grid_elm = this.page.locator("//div[contains(@class, 'maindivforzoom gridzoom')]");
        this.map_Layout_Canvas_elm = this.page.locator("//div[contains(@class, 'canvasparent')]");
        this.map_Layout_Zone_Name_h2 = this.page.locator("//h2/strong")
        this.map_Layout_show_booking_checkbox = this.page.locator("//input[@id='display_desk_names_member']")
        this.map_Layout_zoom_value = this.page.locator("//span[@class='zoom-value']")
        //Login with Gmail
        this.login_with_gmail_btn = this.page.locator("//span[contains(text(), 'Continue with Gmail')]")

        //Login with Microsoft
        this.login_with_microsoft_btn = this.page.locator("//span[contains(text(), 'Continue with Microsoft')]")


        //Member Landing Login Page Elements and Errors 
        this.member_login_landing_email_error = this.page.locator("//p[@id='emailError']")
        this.member_landing_email_label = this.page.locator("//label[contains(text(), 'Your email')]")
        this.member_login_as_admin_btn = this.page.locator("//a[contains(text(), 'Login as an administrator')]")
        this.member_login_term_and_condition_link = this.page.locator("//a[contains(text(), 'Terms and Conditions')]");
        this.member_login_h1_text = this.page.locator("//div[@class='welcome-intro']/h1")
        this.member_login_p_text = this.page.locator("//div[@class='welcome-intro']/p")
        this.member_login_check_list_text = this.page.locator("//ul[contains(@class, 'checklist')]");
        this.member_login_country_dropdown = this.page.locator('#language-dropdown')
        this.member_login_country_dropdown_itm = this.page.locator('.dropdown-menu li');
        this.member_login_country_dropdown_click = this.page.locator("//button[@id='language-dropdown']")
        this.member_login_landing_TermAndCondition_error = this.page.locator("//p[@id='termsConditionError']")
        //Member Dashboard Elements
        this.member_userName_dashboard = this.page.locator('//h6[2]');
        this.member_booking_popup = this.page.locator("//div[@id='myModal']//div[@class='modal-content']");


        this.Map_pop_up_close_btn = this.page.locator("//div[@class='modal-dialog modal-md']//button[contains(text(),'Close')]")
        this.Map_pop_up_close_icon = this.page.locator("(//div[@class='modal-dialog modal-md']//div//button)[1]")


        //Member Parking Hourly All spots
        this.Map_parking_all_spots = this.page.locator("//div[contains(@class,'facing') and contains(@class,'SpotID_blank')]")
        this.parking_hourly_all_spots = this.page.locator("//div[contains(@class, 'facing') and contains(@class, 'SpotID_blank') and @data-hourly='1']")
        this.parking_allday_all_spots = this.page.locator("//div[contains(@class, 'facing') and contains(@class, 'SpotID_blank') and @data-hourly='0']")
        this.parking_inactive_all_spots = this.page.locator("//div[contains(@class, 'facing') and contains(@style, '#D1D1D1')]")
        this.parking_map_spot_popup = this.page.locator("//a[@id='SpotID_blank']")
        this.member_hourly_booking_popup = this.page.locator("//div[@id='viewOption']//div[@class='modal-content']");

        this.member_hourly_30_booking_start = this.page.locator("//input[@id='BookingPeriodStartTime']");
        this.member_hourly_30_booking_end = this.page.locator("//input[@id='BookingPeriodEndTime']");
        this.parking_map_claim_spot_popup = this.page.locator("//button[@id='claim_SpotID']")

        this.parking_map_claim_spot_popup_start_time = this.page.locator("(//div[@class='HourlyClaimMessage']/span/b)[1]")
        this.parking_map_claim_spot_popup_end_time = this.page.locator("(//div[@class='HourlyClaimMessage']/span/b)[2]")
        this.parking_booked_hourly_spot = this.page.locator("//div[contains(@class, 'facing') and contains(@class, 'SpotID_blank') and @data-hourly='1' and @data-showrelease='1']")
        this.parking_realese_hourly_spot = this.page.locator("//a[@id='checkHourlySpot']")
        this.parking_realese_hourly_spot_map = this.page.locator("//button[@id='release_from_map']")
        this.credits_value_elm = this.page.locator("//span[@id='credits_value']")
        this.parking_realese_hourly_slots_more_then1 = this.page.locator("//select[@id='spotBookingPeriodSlot']")
        this.parking_realese_hourly_Booked_user = this.page.locator("(//div[contains(@class, 'facing') and contains(@class, 'SpotID_blank') and @data-hourly='1' and @data-showrelease='1']//td)[2]")
        this.hourly_Report_Violation_btn = this.page.locator("//a[@id='claimParkingViolationForHourlyBooking']")

        this.credit_message_on_spot = this.page.locator("(//span[contains(@class, 'credit_message')]//span)[1]")
        this.Map_Meeting_all_rooms = this.page.locator("//div[contains(@class,'facing') and contains(@class,'SpotID_blank_mb')]")

        this.meeting_Booking_First_Slot = this.page.locator("//td[contains(@class, 'fc-timegrid-slot-lane')and @xpath='1']")
        this.meeting_Next_Btn = this.page.locator("//button[@id='mb_timegrid_next']")

        this.meeting_Name_TextBox = this.page.locator("//input[@id='mb_name']")
        this.meeting_Note_TextBox = this.page.locator("//textarea[@id='mb_note']")

        this.meeting_Repeat_Option_drp = this.page.locator("//select[@id='mb_repeatoption']")
        this.meeting_Search_Participants = this.page.locator("//input[@id='filterbox']")
        this.meeting_First_Participants = this.page.locator("(//input[contains(@class, 'participantUserStatus')])[1]")
        this.meeting_guest_Participants_btn = this.page.locator("//button[@id='addGuestUser_meeting_btn']")
        this.add_Guest_Participant_First_name_input = this.page.locator("//input[@id='FirstName']")
        this.add_Guest_Participant_Last_name_input = this.page.locator("//input[@id='LastName']")
        this.add_Guest_Participant_EmailAddress_input = this.page.locator("//input[@id='EmailAddress']")
        this.add_Guest_Participant_Nationals_input = this.page.locator("//input[@id='NationalID']")
        this.meeting_guest_Participants_save_btn = this.page.locator("//button[@id='addguestmodel_save_btn']")
        this.meeting_Confirm_btn = this.page.locator("//button[@id='mb_Confirm']")
        this.meeting_Next_Btn2 = this.page.locator("//button[@id='mb_next']")

        this.meeting_Main_Menu = this.page.locator("//span[text()='Meetings']")
        this.First_Name_Meeting_Main_Menu = this.page.locator("((//div[@col-id='title'])[2])[1]")
        this.First_Meeting_Cancel = this.page.locator("(//a[@id='openModal'])[1]")
        this.Meeting_Cancel_pop_name = this.page.locator("//span[@class='canceleddname']")
        this.Meeting_Cancel_pop_Confirm = this.page.locator("//button[@id='mb_cancellationConfirm']")
        this.Meeting_Booked_Name_on_Map = this.page.locator("(//td[@class='HourlyRecords'])[3]")
        this.Meeting_Scroller = this.page.locator("//div[@class='ag-body-horizontal-scroll-container']")
        this.Meeting_Search = this.page.locator("//input[@id='filterbox']")
        this.Meeting_All_Slots = this.page.locator(" //div[contains(@class, 'fc-timegrid-slot-label-cushion')]")
        this.Meeting_bookingdate = this.page.locator("//input[@id='mb_bookingdate']")
        this.Meeting_enddate = this.page.locator("//input[@id='mb_enddate']")
        this.Meeting_EndBy = this.page.locator("//select[@id='mb_enddate_endby']")
        this.Meeting_Booked_Room_name_On_Pop = this.page.locator("(//td[@class='HourlyRecords'])[2]")
        this.Meeting_Booked_Date_On_Pop = this.page.locator("(//div[@class='release_SpotID_ctm']/div)[1]")
        this.Meeting_Cancel_pop_button = this.page.locator("//div[@id='release_modal']//button[@type='button'][normalize-space()='Close']")
        this.Meeting_Day_Label_Tue = this.page.locator("//label[contains(text(), 'Tue')]");
        this.Meeting_Repeat_Option = this.page.locator("((//div[@col-id='RepeatOption'])[2])[1]");
        this.Meeting_End_Date = this.page.locator("((//div[@col-id='EndDate'])[2])[1]");
        this.Meeting_Start_Date = this.page.locator("((//div[@col-id='StartDate'])[2])[1]");
        this.Meeting_Monthly_Week_Day_drp = this.page.locator("//select[@id='mb_weekday']");
        this.Meeting_Date_On_Tab = this.page.locator("((//div[@col-id='meeting_date'])[2])[1]");
        this.Meeting_Start_Time_On_Tab = this.page.locator("((//div[@col-id='StartTime'])[2])[1]");
        this.Meeting_End_Time_On_Tab = this.page.locator("((//div[@col-id='EndTime'])[2])[1]");
        this.Meeting_Reschedule_Btn = this.page.locator("//a[text()='Reschedule']");
        this.Meeting_Rescheduled_Name = this.page.locator("//span[@class='rescheduledname']");
        this.Meeting_Start_Time_Drp_On_PopUp = this.page.locator("//select[@id='mb_start_time']");
        this.Meeting_End_Time_Drp_On_PopUp = this.page.locator("//select[@id='mb_end_time']");
        this.Meeting_Rescheduled_Confirm_Btn = this.page.locator("//button[@id='mb_rescheduledConfirm']");
        this.Meeting_Rescheduled_Booking_Option = this.page.locator("//select[@id='mb_rescheduled_booking_option']");
        this.add_primary_vehicle_btn = this.page.locator("(//i[@id='add_primary'])[1]");
        this.Member_Menu_Search_Bookings = this.page.locator("//span[text()='Search bookings']");
        this.Member_Menu_Search_Bookings_dropdown = this.page.locator("//button/span[contains(text(), 'All selected')]");
        this.member_first_name_text = this.page.locator("//input[@id='first_name']");
        this.member_last_name_text = this.page.locator("//input[@id='last_name']");
        this.member_zone_dropdown = this.page.locator("//select[@id='defaultZone']");
        this.member_group_dropdown = this.page.locator("//select[@name='group']");
        this.member_Search_by_name = this.page.locator("//input[@id='search_by_name']");
        this.member_first_Search_Year = this.page.locator("(//div[@class='monthbookinglistMainDiv'])[1]//div[@class='monthname']");
        this.member_first_Search_Date = this.page.locator("(//div[@class='monthbookinglistMainDiv'])[1]//div[@class='bookingDate']");
        this.member_first_Search_Spot_Number = this.page.locator("(//div[contains(@class,'bookingSpotnumber')])[1]");










        // Admin Locators 

        this.admin_Main_radio_login = this.page.locator("//div[@class='check-border']");
        this.admin_Main_Menu_Insights = this.page.locator("//span[text()='Insights']");
        this.admin_Sub_Menu_Live_view = this.page.locator("//a[text()='Live view']");
        this.admin_Sub_Menu_Live_view_Expended = this.page.locator("//a[@data-tooltip='Insights' and @aria-expanded='true']");
        this.admin_contry_dropdown = this.page.locator("//div[@class='button-inner']");
        this.admin_Main_Spaces = this.page.locator("//span[text()='Spaces']");
        this.admin_Sub_Zones_and_maps = this.page.locator("//a[text()='Zones and maps']");
        this.admin_Sub_Parking_spaces = this.page.locator("//a[text()='Parking spaces']");
        this.admin_Sub_Add_Parking_spaces_Btn = this.page.locator("//a[text()='Add parking space']");
        this.admin_Add_spot_Zone_dropdown = this.page.locator("//select[@id='car_park_id']");
        this.admin_Aad_spot_input = this.page.locator("//input[@id='parking_number']");
        this.admin_Add_spot_Vehicle_size_dropdown = this.page.locator("//button[contains(@class,'multiselect') and @title='Vehicle size']");
        this.selectAllCheckbox_Vehicle_size = this.page.locator("//button[contains(@class,'multiselect') and @title='Vehicle size']/following-sibling::ul//input[@value='multiselect-all']");
        this.admin_Add_spot_Fuel_types_dropdown = this.page.locator("//button[@title='Fuel types']");
        this.selectAllCheckbox_Fuel_types = this.page.locator('(//input[@type="checkbox"][@value="multiselect-all"])[2]');
        this.admin_Sub_Add_Parking_spaces_Complete_Btn = this.page.locator("//button[text()='Complete']");
        this.admin_Sub_Desks_spaces = this.page.locator("//a[text()='Desks']");
        this.admin_Sub_Add_desk_Btn = this.page.locator("//a[text()='Add desk']");

        // Admin Locators Dashboard Live-View
        this.admin_Live_View_Default = this.page.locator("//li[@class='active currentMenu']/a[text()='Live view']");
        this.admin_Live_View_DatePicker_Month_Year = this.page.locator("//div[@class='datepicker-days']//th[@class='datepicker-switch']");
        this.admin_Live_View_DatePicker_Currunt_Active_Date = this.page.locator("//td[@class='active day']");
        this.admin_Live_View_DatePicker = this.page.locator("//input[@id='datepicker']");
        this.admin_Live_View_Zone_DropDown = this.page.locator("//select[@id='car_park_id_dashboard']");

        this.admin_All_Available_Spots = this.page.locator("//div[contains(@class, 'spot_grid') and contains(@class, 'unassigned_spots')]");
        this.admin_All_Booked_Spots = this.page.locator("//div[contains(@class, 'spot_grid assingned_spots')]");
        this.admin_Filter_Elements = this.page.locator("//input[@id='selectedCount']");
        this.admin_Filter_Collapse = this.page.locator("//a[@class='collapsed']");
        this.admin_Filter_Btn = this.page.locator("//a[@aria-controls='collapseCard']");
        this.admin_Filter_Avilable_Icons = this.page.locator("//div[contains(@class, 'avilable-icons')]");
        this.admin_Filter_Book_Icons = this.page.locator("//div[contains(@class, 'book-icons')]");
        this.admin_Filter_Report_Icons = this.page.locator("//div[contains(@class, 'report-icons')]");
        this.admin_Filter_Waitlist_Icons = this.page.locator("//div[contains(@class, 'waitlist-icons')]");
        this.admin_First_Available_Spot = this.page.locator("(//div[contains(@class,'spot_grid') and contains(@class,'unassigned_spots')])[1]//a");
        this.admin_Spot_SideBar_Header = this.page.locator("//strong[@class='canvas-edit-spot']")
        this.admin_Spot_SideBar_Close_Icon = this.page.locator("(//button[@class='btn-close text-reset'])[1]")
        this.admin_Spot_SideBar_Space_number_input_value = this.page.locator("//input[@id='parking_number']")
        this.admin_menu_sidebar_open = this.page.locator("//div[@class='sidebar open']");
        this.admin_Sub_Menu_Header = this.page.locator("//div[@class='header-left-inner']/h2");
        this.admin_Sub_Menu_Reports = this.page.locator("//a[text()='Reports']");
        this.admin_Main_Menu_Bookings = this.page.locator("//span[text()='Bookings']");
        this.admin_Sub_Menu_Space_Bookings = this.page.locator("//a[text()='Space bookings']");
        this.admin_Sub_Menu_Room_Bookings = this.page.locator("//a[text()='Room bookings']");
        this.admin_Sub_Menu_Scheduler = this.page.locator("//a[text()='Scheduler']");
        this.admin_Sub_Menu_Closing_Dates = this.page.locator("//a[text()='Closing dates']");
        this.admin_Main_Menu_Bookings = this.page.locator("//span[text()='Bookings']");
        this.admin_Main_Menu_Spaces = this.page.locator("//span[text()='Spaces']");
        this.admin_Sub_Menu_Zones_and_Maps = this.page.locator("//a[text()='Zones and maps']");
        this.admin_Sub_Menu_Parking_Spaces = this.page.locator("//a[text()='Parking spaces']");
        this.admin_Sub_Menu_Desks = this.page.locator("//a[text()='Desks']");
        this.admin_Sub_Menu_Meeting_Rooms = this.page.locator("//a[text()='Meeting rooms']");
        this.admin_Sub_Menu_Bulk_Actions = this.page.locator("//a[text()='Bulk actions']");
        this.admin_Main_Menu_Users = this.page.locator("//span[text()='Users']");
        this.admin_Sub_Menu_Employees = this.page.locator("//a[text()='Employees']");
        this.admin_Sub_Menu_Login_Methods = this.page.locator("//a[text()='Login methods']");
        this.admin_Sub_Menu_Administrators = this.page.locator("//a[text()='Administrators']");
        this.admin_Sub_Menu_Group_Settings = this.page.locator("//a[text()='Group settings']");
        this.admin_Sub_Menu_Team_Permissions = this.page.locator("//a[text()='Team permissions']");
        this.admin_Sub_Menu_Health_and_Safety = this.page.locator("//a[text()='Emergency roles']");
        this.admin_Main_Menu_Account = this.page.locator("//span[text()='Account']");
        this.admin_Sub_Menu_General_Settings = this.page.locator("//a[text()='General settings']");
        this.admin_Sub_Menu_Email_Templates = this.page.locator("//a[text()='Email templates']");
        this.admin_Sub_Menu_Notification_Templates = this.page.locator("//a[text()='Notification templates']");
        this.admin_Sub_Menu_Admin_alerts = this.page.locator("//a[text()='Admin alerts']");
        this.admin_Sub_Menu_Pre_booking_Questions = this.page.locator("//a[text()='Pre-booking questions']");
        this.admin_Sub_Menu_Post_booking_Questions = this.page.locator("//a[text()='Post-booking questions']");
        this.admin_Sub_Menu_Integrations = this.page.locator("//a[text()='Integrations']");
        this.admin_First_Spot_ThreeDots = this.page.locator("(//div[contains(@class,'grid-item') and contains(@class,'unassigned_spots')])[1]//div[@class='actions_lower']/a[@id='todolink']");
        this.admin_First_spot_popup_header = this.page.locator("//h4[@id='viewOptionLabel']");
        this.admin_spot_popup_edit_button = this.page.locator("//button[contains(text(), 'Edit space')]");
        this.admin_spot_popup_history_button = this.page.locator("(//button[contains(normalize-space(.), 'Space history')])[1]");
        this.admin_spot_popup_book_button = this.page.locator("(//button[contains(normalize-space(.), 'Book space')])[2]");
        this.admin_spot_second_popup_header = this.page.locator("//h2[@id='exampleModalLabel']");
        this.admin_spot_second_popup_Default_employee_button = this.page.locator("//button[@id='pills-registered-tab' and @aria-selected='true']");
        this.admin_spot_second_popup_search_user_input = this.page.locator("//input[@id='assignuid']");
        this.admin_spot_second_popup_vehicle_type_Dropdown = this.page.locator("//select[@class='ctm-select vehicletype select2-hidden-accessible']");
        this.admin_spot_second_popup_BookSpot_button = this.page.locator("//button[@id='assignToReg']");
        this.admin_First_Booked_Spot = this.page.locator("(//div[contains(@class,'spot_grid assingned_spots')])[1]//p");
        this.admin_All_Booked_Spot = this.page.locator("(//div[contains(@class,'spot_grid assingned_spots')])//p");
        this.admin_First_Booked_Spot_Details_User_name = this.page.locator("(//div[contains(@class,'spot_grid_content position-relative')])[1]//div[@class='spot_details']/h6");
        this.admin_All_Booked_Spots_Live = this.page.locator("//div[contains(@class,'grid-item position-relative assingned_spots')]//div[@class='actions_lower'][2]");
        this.admin_All_Booked_Spots_Live_Release_Button = this.page.locator("(//button[contains(text(), 'Release')])[2]");
        this.admin_First_popup_cross_icon = this.page.locator("//div[@id='viewOption']//div[@class='modal-header']//img[@class='img-fluid']");
        this.admin_second_popup_cross_icon = this.page.locator("//div[@id='viewUserOption']//img[@class='img-fluid']");
        this.admin_second_popup_cancel_button = this.page.locator("//button[@id='cancelAction']");
        this.admin_second_popup_guest_tab_button = this.page.locator("//button[@id='pills-guest-tab']");
        this.admin_All_Available_Spots_Map = this.page.locator("//div[contains(@class, 'allocated_spots') and not(contains(@class, 'infoWithOutHover'))]");
        this.admin_All_Booked_Spots_Map = this.page.locator("//div[contains(@class, 'allocated_spots') and (contains(@class, 'infoWithOutHover'))]");
        this.admin_All_Booked_Spots_Map_Spot_Name = this.page.locator("//div[contains(@class, 'allocated_spots') and (contains(@class, 'infoWithOutHover'))]/div[@class='image-div']");

        // Admin Spaces Menu Elements  

        this.admin_Spaces_Zone_and_space_Add_zone_button = this.page.locator("//button[contains(text(), 'Add zone')]");
        this.admin_Spaces_Zone_and_space_Export_button = this.page.locator("//a[@id='export_Zones']");
        this.admin_Spaces_Zone_and_space_List_all_Zone = this.page.locator("//div[@col-id='CarParkName']//span[@role='presentation']/span/a");
        this.admin_Spaces_Zone_and_space_List_all_Zone_count = this.page.locator("//input[@id='statusbox1']");
        this.admin_Spaces_Zone_and_space_List_all_Zone_Active_count = this.page.locator("//input[@id='statusbox2']");
        this.admin_Spaces_Zone_and_space_List_all_Zone_INActive_count = this.page.locator("//input[@id='statusbox3']");
        this.admin_Spaces_Zone_and_space_first_zone_link = this.page.locator("//div[@row-index='0']//div/span/span/a");
        this.admin_Spaces_Zone_and_space_Header_Name = this.page.locator("//span[@class='ag-header-cell-text']");
        this.admin_Spaces_Zone_and_space_Zone_search_input = this.page.locator("//input[@id='ag-64-input']");
        this.admin_Spaces_Zone_and_space_Zone_First_Edit = this.page.locator("(//div[@row-index='0']//div/span/div/a)[2]");
        this.admin_Spaces_Zone_and_space_Zone_First_Edit_input_value = this.page.locator("//input[@id='CarParkName']");

        this.admin_Spaces_Zone_Add_zone_Popup = this.page.locator("//h2[text()='Creating a new zone']");
        this.admin_Spaces_Zone_Add_zone_Popup_Close_Button = this.page.locator("//h2[contains(@class, 'modal-title')]/following-sibling::button[contains(@class, 'btn-close')]");
        this.admin_Spaces_Zone_Add_zone_Popup_text01 = this.page.locator("(//span[contains(text(),'A zone can represent a location')])[2]");
        this.admin_Spaces_Zone_Add_zone_Popup_Zone_Name_label = this.page.locator("//form[@id='quickzoneform']//div[@class='form-row']//div[1]//label[1]");
        this.admin_Spaces_Zone_Add_zone_Popup_Zone_Name_input = this.page.locator("//input[@id='qzonename']");
        this.admin_Spaces_Zone_Add_zone_Popup_Zone_type_label = this.page.locator("(//label[@for='zone-type'])[2]");
        this.admin_Spaces_Zone_Add_zone_Popup_Zone_type_input = this.page.locator("//span[@id='select2-qzonetype-container']");
        this.admin_Spaces_Zone_Add_zone_Popup_Map_type_label = this.page.locator("//label[@for='license-number']");
        this.admin_Spaces_Zone_Add_zone_Popup_Map_type_input = this.page.locator("//span[@id='select2-qlayouttype-container']");
        this.admin_Spaces_Zone_Add_zone_Popup_Time_zone_label = this.page.locator("(//label[contains(text(),'Time zone')])[2]");
        this.admin_Spaces_Zone_Add_zone_Popup_Time_zone_input = this.page.locator("//span[@id='select2-timezone quickzoneformtimezones-container']");
        this.admin_Spaces_Zone_Add_zone_toggel = this.page.locator("//input[@id='quicklink']");
        this.admin_Spaces_Zone_Add_zone_toggel_text = this.page.locator("//p[text()='Switch to advanced setup']");
        this.admin_Spaces_Zone_Add_zone_Complete_button = this.page.locator("(//button[text()='Complete'])[2]");
        this.admin_Spaces_Zone_Add_zone_Toggeled_Header_text1 = this.page.locator("//div[@class='popup-content']//span[contains(text(),'A zone can represent a location')]");
        this.admin_Spaces_Zone_Add_zone_Toggeled_Header_text2 = this.page.locator("//p[contains(text(),'A zone can either')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Zone_Name_label = this.page.locator("(//label[text()='Zone name'])[1]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Zone_Name_input = this.page.locator("//input[@id='zonename']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Zone_Type_label = this.page.locator("//label[text()='Type']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Zone_Type_input = this.page.locator("//span[@id='select2-zonetype-container']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Map_type_label = this.page.locator("//label[@for='Map-Type']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Map_type_input = this.page.locator("//span[@id='select2-layouttype-container']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Time_zone_label = this.page.locator("(//label[contains(text(),'Time zone')])[1]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Time_zone_input = this.page.locator("//span[@id='select2-timezone-container']");
        this.admin_Spaces_Zone_Add_zone_Toggled_file_label = this.page.locator("//label[@for='file']");
        this.admin_Spaces_Zone_Add_zone_Toggled_file_input = this.page.locator("//input[@id='formFile']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Steps = this.page.locator("//li[@class='active']//div");
        this.admin_Spaces_Zone_Add_zone_Toggled_Zone_Type_input_dropdown = this.page.locator("//select[@id='zonetype']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Map_type_input_dropdown = this.page.locator("//select[@id='layouttype']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Next_button = this.page.locator("//button[contains(@class, 'zonestep1')]")
        this.admin_Spaces_Zone_Add_zone_Toggled_Header_Step2 = this.page.locator("//p[contains(text(),'After a booking is canceled')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step2 = this.page.locator("//div[contains(@aria-label, 'Releasing a space')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Allow_re_booking_after_cancellation_label = this.page.locator("//label[text()='Allow re-booking after cancellation']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Allow_re_booking_after_cancellation_input = this.page.locator("//select[@id='FlgInstanceRelease']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step2 = this.page.locator("//button[contains(@class, 'zonestep2')]")
        this.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step3 = this.page.locator("//div[contains(@aria-label, 'This token-based')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Credit_system_label = this.page.locator("//p[text()='Credit system']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Credit_system_input = this.page.locator("//input[@id='credit_system_check']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step3 = this.page.locator("//button[contains(@class, 'zonestep3')]")
        this.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step3 = this.page.locator("//button[contains(@class, 'backBtn2 ')]")
        this.admin_Spaces_Zone_Add_zone_Toggled_Booking_cost_label = this.page.locator("//label[contains(text(), 'Booking cost')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Booking_cost_input = this.page.locator("//select[@id='ZoneCreditValue']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step3_2 = this.page.locator("//div[contains(@aria-label, 'Credit refunds reward employees who')]");
        this.admin_Spaces_Zone_Add_zone_Credit_refund_Cancel_before_label = this.page.locator("//p[contains(text(), 'Credit refund — Cancel before')]");
        this.admin_Spaces_Zone_Add_zone_Credit_refund_Adjust_time_slider_label = this.page.locator("//p[contains(text(), 'Adjust the time slider for staff')]");
        this.admin_Spaces_Zone_Add_zone_Credit_refund_Full_refund_label = this.page.locator("//span[contains(text(),'Full refund')]");
        this.admin_Spaces_Zone_Add_zone_Credit_refund_Half_refund_label = this.page.locator("//span[contains(text(),'Half refund')]");
        this.admin_Spaces_Zone_Add_zone_Credit_refund_No_refund_label = this.page.locator("//span[contains(text(),'No refund')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Enable_booking_reminders_button = this.page.locator("//label[@for='nextdaynotificationon']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Enable_email_reminders_Label = this.page.locator("//label[contains(text(), 'Email reminders')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step4 = this.page.locator("//p[contains(text(), 'You can set reminders')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step_2 = this.page.locator("//div[contains(@aria-label, 'Block last-minute bookings')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Disable_booking_reminders_button = this.page.locator("//label[@for='nextdaynotificationoff']");
        this.admin_Spaces_Zone_Add_zone_ToggledBlock_last_minute_bookings_toggeled = this.page.locator("//input[@id='minimum_advance_reservation_check']");
        this.admin_Spaces_Zone_Add_zone_ToggledBlock_last_minute_bookings_label_txt = this.page.locator("//label[contains(text(), 'Block last-minute bookings')]");

        this.admin_Spaces_Zone_Add_zone_ToggledBlock_last_minute_bookings_input = this.page.locator("//select[@id='NoBookingsBefore']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step4 = this.page.locator("//button[contains(@class, 'zonestep4')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Header_Hover_text_Step5 = this.page.locator("//p[contains(text(), 'Allow employees on the waitlist')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_waitlist_position_label_txt = this.page.locator("(//label[contains(text(), 'Show waitlist position')])[1]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Disable_booking_reminders_button_2 = this.page.locator("(//label[contains(text(), 'Show waitlist position')])[1]");
        this.admin_Spaces_Zone_Add_zone_Toggled_waitlist_position_on_button = this.page.locator("//input[@id='rqon']");
        this.admin_Spaces_Zone_Add_zone_Toggled_waitlist_position_off_button = this.page.locator("//label[@for='rqoff']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Show_bookings_to_users_Label = this.page.locator("//label[contains(text(),'Show bookings to users')]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Unlock_90th_day_Label = this.page.locator("(//label[contains(text(),'Unlock 90th day')])[1]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Show_bookings_to_users_Select = this.page.locator("//select[@id='BookingsViewableByStaff']");
        this.admin_Spaces_Zone_Add_zone_Toggled_random_book_time_type_Select = this.page.locator("//select[@id='randomBookTimeType']");

        this.admin_Spaces_Zone_Add_zone_Toggled_Unlock_90th_day_at_label = this.page.locator("(//label[contains(text(),'Unlock 90th day at')])[1]");
        this.admin_Spaces_Zone_Add_zone_Toggled_Unlock_90th_day_at_input = this.page.locator("//input[@id='randomBookTimeFld']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step5 = this.page.locator("//button[contains(@class, 'zonestep5')]")
        this.admin_Spaces_Zone_Add_zone_Toggled_Administrator_access_label = this.page.locator("//p[text()='Administrator access']");
        this.admin_Spaces_Zone_Add_zone_Toggled_Next_button_step6 = this.page.locator("//button[contains(@class, 'zonestep6')]")
        this.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step6 = this.page.locator("//button[contains(@class, 'backBtn5')]")
        this.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step5 = this.page.locator("//button[contains(@class, 'backBtn4')]")
        this.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step4 = this.page.locator("//button[contains(@class, 'backBtn3')]")
        this.admin_Spaces_Zone_Add_zone_Toggled_Back_button_step2 = this.page.locator("//button[contains(@class, 'backBtn1')]")

        // Admin Spot Genral Tabs

        this.admin_Spaces_Spot_Header_Name = this.page.locator("//ul[@id='pills-tab']//button")
        this.admin_Spaces_Spot_General_hover_texts = this.page.locator("//div[@id='pills-general']//p/parent::div//div");
        this.admin_Spaces_Spot_General_Labels = this.page.locator("//div[@id='pills-general']//p");
        this.admin_Spaces_Zone_Active_zone_Toggled_Type_input = this.page.locator("//input[@class='form-check-input' and @id='Type']");
        this.admin_Spaces_Zone_type_Dropdown = this.page.locator("//span[contains(@id, 'select2-ZoneType')]");
        this.admin_Spaces_Zone_Map_configuration_Dropdown = this.page.locator("//select[@name='LayoutType']");
        this.admin_Spaces_Zone_Timezone_Dropdown = this.page.locator("//select[@id='timezone']");
        this.admin_Spaces_Zone_Update_button = this.page.locator("//button[@id='FrmcarparkSubmit']");
        this.admin_Spaces_Zone_Cancel_button = this.page.locator("//div[@class='btn-input']/a[text()='Cancel']");
        this.admin_Spaces_Zone_type_Dropdown_2 = this.page.locator("(//select[@name='ZoneType']/following-sibling::span//span)[2]");


        //Wifi Checking 
        this.admin_Wifi_Checking_Add_Integration_Button = this.page.locator("//button[@title='Add integration']");
        this.admin_Wifi_Checking_Integration_List = this.page.locator("//div[@class='modal-body']//a/img");
        this.admin_Wifi_Checking_Integration_Header = this.page.locator("//h2[@id='integrationsModalLabel']");
        this.admin_Wifi_Checking_Integration_Close_Button = this.page.locator("(//div[@class='modal-header']//button)[1]");
        this.admin_Wifi_Checking_Integration_Wifi_button = this.page.locator("//div[@class='modal-body']//a//img[@id='Wi-Fi']");
        this.admin_Wifi_Checking_Integration_form1_label = this.page.locator("//*[@id='WifiIntegrationForm']//p");
        this.admin_Wifi_Checking_Integration_form1_type_input = this.page.locator("//input[@id='integrationtypetext' and @readonly]");
        this.admin_Wifi_Checking_Integration_form1_name_input = this.page.locator("//input[@id='name']");
        this.admin_Wifi_Checking_Integration_form1_status_dropdown = this.page.locator("//select[@name='status']");
        this.admin_Wifi_Checking_Integration_form1_cancel_button = this.page.locator("//a[text()='Cancel']");
        this.admin_Wifi_Checking_Integration_form1_submit_button = this.page.locator("//button[@id='submit']");
        this.admin_Wifi_Checking_Integration_form1_name_Blank_error_message = this.page.locator("(//span[@class='text-error'])[1]");
        this.admin_Wifi_Checking_Integration_Search_Box = this.page.locator("//input[@ref='eInput' and @aria-label='Name Filter Input']");
        this.admin_Wifi_Checking_Integration_First_Row_Name = this.page.locator("//div[@role='row'][@row-index='0']//div[@col-id='name']");
        this.admin_Wifi_Checking_Integration_Disabled_Button = this.page.locator("//img[@id='Wi-Fi']/parent::a[contains(@class, 'disabled')]");
        this.admin_Wifi_Checking_Integration_Delete_Button_on_Popup = this.page.locator("//button[@id='delete_integration']");

        this.admin_Wifi_Checking_Integration_ACTpro_button = this.page.locator("//img[@id='ACTpro']");
        this.admin_Wifi_Checking_Integration_Duplicate_Error_Message = this.page.locator("//p[contains(text(),'Username already exists')]");
        this.admin_Wifi_Checking_Integration_Table_Label = this.page.locator("//span[@ref='eText']");
        this.admin_Wifi_Checking_Integration_First_Row_Type = this.page.locator("//div[@role='row'][@row-index='0']//div[@col-id='integrationtype']");
        this.admin_Wifi_Checking_Integration_First_Row_Status = this.page.locator("//div[@role='row'][@row-index='0']//div[@col-id='status']//span//div");

        this.admin_Wifi_Checking_Integration_Delete_Button_first_integration = this.page.locator("(//div[@class='btn-group'])[1]//a[@data-original-title='Delete']");
        this.admin_Wifi_Checking_Integration_Wifi_Button_first_integration = this.page.locator("(//div[@class='btn-group'])[1]//a[@data-original-title='ANPR']");
        this.admin_Wifi_Checking_Integration_Wifi_Edit_first_integration = this.page.locator("(//div[@class='btn-group'])[1]//a[@data-original-title='Edit']");
        this.admin_Wifi_Checking_Step2_Aerrow_icon = this.page.locator("//div[@class='domain-icon']");
        this.admin_Wifi_Checking_Step2_Wifi_img = this.page.locator("//div[@class='domain-img']");
        this.admin_Wifi_Checking_Step2_Header_text = this.page.locator("//div[@class='domain-content']//h3");
        this.admin_Wifi_Checking_Step2_Header_text_2 = this.page.locator("//div[@class='domain-content']//p");
        this.admin_Wifi_Mapping_Header_text = this.page.locator("//div[@id='WifiZoneMapping']//h2");
        this.admin_Wifi_default_selected_Mapping_type = this.page.locator("//input[contains(@class, 'ctm-success')]/parent::div/label/p");
        this.admin_Wifi_default_selected_Mapping_List = this.page.locator("//*[@id='MappingSelectionForm']//label/p");
        this.admin_Wifi_default_selected_Mapping_List_text = this.page.locator("//div[contains(@class, 'flex-1')]//p");
        this.admin_Wifi_Mapping_Next_btn = this.page.locator("//button[text()='Next']");
        this.admin_Wifi_Mapping_Cancel_btn = this.page.locator("(//button[text()='Cancel'])[1]");
        this.admin_Wifi_Mapping_Add_another_btn = this.page.locator("//a[contains(text(), 'Add another Wi-Fi')]");
        this.admin_Wifi_Mapping_BSSID_Add_another_btn = this.page.locator("//a[contains(text(), 'Add another BSSID')]");
        this.admin_Wifi_Mapping_Name_label = this.page.locator("//label[text()='Mapping name']");
        this.admin_Wifi_Mapping_Name_input = this.page.locator("//input[@id='mapping_name']");

        this.admin_Wifi_Zone_association_label = this.page.locator("//label[contains(text(), 'Zone association')]");

        this.admin_Wifi_Zone_association_Hover_text = this.page.locator("//label[contains(text(), 'Zone association')]//div");

        this.admin_Wifi_Zone_association_inputClick = this.page.locator("//span[@class='multiselect-selected-text']");
        this.admin_Wifi_Zone_association_input = this.page.locator("//select[@id='mapping_zone_id']");

        this.admin_Wifi_network_name_label = this.page.locator("//label[contains(text(), 'Wi-Fi network name')]");
        this.admin_BSSID_name_label = this.page.locator("//label[contains(text(), 'BSSID')]");
        this.admin_Wifi_network_name_Hover_text = this.page.locator("//label[contains(text(), 'Wi-Fi network name')]//div");

        this.admin_Wifi_network_BSSID_Hover_text = this.page.locator("//label[contains(text(), 'BSSID')]//div");
        this.admin_Wifi_network_name_input = this.page.locator("//input[@id='signal_name_1']");
        this.admin_Wifi_network_name_input_2 = this.page.locator("//input[@id='signal_name_2']");
        this.admin_Wifi_BSSID_input = this.page.locator("//input[@id='wifi_bssid_1']");
        this.admin_Wifi_BSSID_input_2 = this.page.locator("//input[@id='wifi_bssid_2']");

        this.admin_Wifi_network_Apply_Button = this.page.locator("//button[@Name='submit']");
        this.admin_Wifi_network_Cancel_Button = this.page.locator("(//button[@type='button'and text()='Cancel'])[2]");
        this.admin_Wifi_Created_Mapping_Name = this.page.locator("(//h6)[1]");
        this.admin_Wifi_Created_Mapping_Name_2 = this.page.locator("(//h6)[2]");
        this.admin_Wifi_Checking_Mapping_Duplicate_Error_Message = this.page.locator("//p[contains(text(),'A mapping with this name already exists')]");
        this.admin_Wifi_Checking_Mapping_Delete_button = this.page.locator("//button[@type='button' and contains(text(), 'Delete Wi-Fi mapping')]");
        this.admin_Wi_Fi_network_name_Button = this.page.locator("(//button[contains(text(), 'Wi-Fi network name')])[1]");
        this.admin_Wi_Fi_network_BSSID_name_Button = this.page.locator("(//button[contains(text(), 'BSSID')])[1]");
        this.admin_Wi_Fi_network_name_Button_2 = this.page.locator("(//button[contains(text(), 'Wireless access point identifiers')])[1]");
        this.admin_Wi_Fi_network_Name_second_text = this.page.locator("//ul[@class='dropdown-menu show']//li[2]");
        this.admin_Wi_Fi_BSSID_network_Name_second_text = this.page.locator("//ul[@class='dropdown-menu show']//li[2]");
        this.admin_Space_zone_Checkin_tab = this.page.locator("//Button[@id='pills-checkin-tab']");
        this.admin_Space_zone_Checkin_tab_checkin_type_label = this.page.locator("//p[text()='Check-in type']");
        this.admin_Space_zone_Checkin_tab_checkin_Tab_Submit_Button = this.page.locator("//button[@id='FrmcarparkSubmit']");
        this.admin_Space_zone_Checkin_tab_checkin_Tab_dropdown_Button = this.page.locator("(//div[@class='btn-group']//button)[1]");
        this.admin_Space_zone_Display_Tab_Button = this.page.locator("//button[text()='Display']");
        this.admin_Space_zone_Display_map_zoom_level_Scroller = this.page.locator('//input[@id="range1"]');
        this.admin_Spaces_Spot_Display_hover_texts = this.page.locator("//div[@id='pills-display']//p/parent::div//div");
        this.admin_Spaces_Spot_Display_Labels = this.page.locator("//div[@id='pills-display']//p");
        this.admin_Spaces_Zone_Display_colour_Dropdown = this.page.locator('//select[@id="ShowAvailabilityColour"]');
        this.admin_Spaces_Zone_Display_position_Toggle = this.page.locator("//input[@class='form-check-input' and @name='ShowPositionInQueue']");

        // Font size input and buttons (used in "Map font size")
        this.admin_Spaces_Map_Fontsize_Input = this.page.locator('//input[@id="fontmapsize"]');
        this.admin_Spaces_Map_Fontsize_Plus_Button = this.page.locator('//input[@class="button-plus" and @data-field="fontmapsize"]');
        this.admin_Spaces_Map_Fontsize_Minus_Button = this.page.locator('//input[@class="button-minus" and @data-field="fontmapsize"]');
        this.admin_Spaces_Zone_Display_File_Upload = this.page.locator("//input[@id='ParkingInformation']");
        this.admin_Space_zone_Reminders_Tab_Button = this.page.locator("//button[text()='Reminders']");

        this.admin_Spaces_Spot_Reminder_hover_texts = this.page.locator("//div[@id='pills-reminders']//p/parent::div//div");
        this.admin_Spaces_Spot_Reminder_Labels = this.page.locator("//div[@id='pills-reminders']//p");
        this.admin_Spaces_Spot_Reminder_Column_Header = this.page.locator("//div[@id='reminderColumnHeaders']//h3");

        this.admin_Spaces_hourlyBookings_SendReminders_Dropdown = this.page.locator("//select[@id='hourlyBookingsSendReminders']");
        this.admin_Spaces_dailyBookings_SendReminders_Dropdown = this.page.locator("//select[@id='dailyBookingsSendReminders']");
        this.admin_Spaces_scheduledBookings_SendReminders_Dropdown = this.page.locator("//select[@id='scheduledBookingsSendReminders']");

        this.admin_Spaces_hourlyBookings_ReminderFrequency_Dropdown = this.page.locator("//select[@id='hourlyBookingsReminderFrequency']");
        this.admin_Spaces_dailyBookings_ReminderFrequency_Dropdown = this.page.locator("//select[@id='dailyBookingsReminderFrequency']");
        this.admin_Spaces_scheduledBookings_ReminderFrequency_Dropdown = this.page.locator("//select[@id='scheduledBookingsReminderFrequency']");

        this.admin_Spaces_hourlyBookings_Remindertime_Dropdown = this.page.locator("//select[@id='hourlyBookingsReminderTimeSelect']");
        this.admin_Spaces_dailyBookings_Remindertime_input = this.page.locator("//input[@id='dailyBookingsReminderTimeText']");
        this.admin_Spaces_scheduledBookings_Remindertime_input = this.page.locator("//input[@id='scheduledBookingsReminderTimeText']");

        this.admin_Spaces_hourly_ConfirmationRequiredInReminder_toggle = this.page.locator("//input[@id='hourlyConfirmationRequiredInReminder']");
        this.admin_Spaces_daily_ConfirmationRequiredInReminder_toggle = this.page.locator("//input[@id='dailyConfirmationRequiredInReminder']");
        this.admin_Spaces_scheduled_daily_ConfirmationRequiredInReminder_toggle = this.page.locator("//input[@id='scheduledConfirmationRequiredInReminder']");

        this.admin_Spaces_hourlyBookings_ConfirmationRequiredWithin_Dropdown = this.page.locator("//select[contains(@class, 'hourlyConfirmationRequiredWithin')]");
        this.admin_Spaces_dailyBookings_ConfirmationRequiredWithin_Dropdown = this.page.locator("//select[contains(@class, 'dailyConfirmationRequiredWithin')]");
        this.admin_Spaces_scheduledBookings_ConfirmationRequiredWithin_Dropdown = this.page.locator("//select[contains(@class, 'scheduledConfirmationRequiredWithin')]");


        this.admin_Spaces_daily_BookingEndReminder_toggle = this.page.locator("//input[@id='hourlyBookingsBookingEndReminder']");
        this.admin_Spaces_dailyBookings_BookingEndReminderTime_Dropdown = this.page.locator("//select[contains(@class, 'hourlyBookingsBookingEndReminderTime')]");

        this.admin_Spaces_Spot_Credit_Tab_Button = this.page.locator("//button[contains(text(),'Credits')]");
        this.admin_Spaces_Spot_Credit_Labels = this.page.locator("//div[@id='pills-credit']//p");
        this.admin_Spaces_Spot_Credit_hover_texts = this.page.locator("//div[@id='pills-credit']//p/parent::div//div");

        this.admin_Spaces_credit_system_check_toggle = this.page.locator("//input[@id='credit_system_check']");

        this.admin_Spaces_Booking_Cost_Dropdown = this.page.locator("//select[@name='ZoneCreditValue']");


        this.admin_zone_credit_slider_1 = this.page.locator("#slider-range-for-next-day");

        this.admin_Spaces_CreditRefundDuringCurrentRefill_toggle = this.page.locator("//input[@name='CreditRefundDuringCurrentRefill']");

        this.admin_Spaces_Spot_checkin_hover_texts = this.page.locator("//div[@id='pills-checkin']//p/parent::div//div");
        this.admin_Spaces_Spot_checkin_Labels = this.page.locator("//div[@id='pills-checkin']//p");
        this.admin_Spaces_Spot_Checkin_Column_Header = this.page.locator("//div[@id='checkInReminder_autoReleaseDiv']//h3");

        this.admin_Spaces_hourly_hourlyCheckInReminder_toggle = this.page.locator("//input[@id='hourlyCheckInReminder']");
        this.admin_Spaces_daily_dailyCheckInReminder_toggle = this.page.locator("//input[@id='dailyCheckInReminder']");
        this.admin_Spaces_scheduledCheckInReminder_toggle = this.page.locator("//input[@id='scheduledCheckInReminder']");
        this.admin_Spaces_hourlyCheckInReminderTime_Dropdown = this.page.locator("//select[@id='hourlyCheckInReminderTime']");

        this.admin_Spaces_dailyCheckInReminderTimeText_input = this.page.locator("//input[@id='dailyCheckInReminderTimeText']");
        this.admin_Spaces_scheduledCheckInReminderTimeText_input = this.page.locator("//input[@id='scheduledCheckInReminderTimeText']");


        this.admin_Spaces_hourlyAutoRelease_toggle = this.page.locator("//input[@id='hourlyAutoRelease']");
        this.admin_Spaces_dailyAutoReleaser_toggle = this.page.locator("//input[@id='dailyAutoRelease']");
        this.admin_Spaces_scheduledAutoRelease_toggle = this.page.locator("//input[@id='scheduledAutoRelease']");

        this.admin_Spaces_hourlyAutoReleaseAfter_Dropdown = this.page.locator("//select[@id='hourlyAutoReleaseAfter']");
        this.admin_Spaces_daily_dailyCheckInReminder_Dropdown = this.page.locator("//select[@id='dailyAutoReleaseAfter']");
        this.admin_Spaces_scheduledCheckInReminder_Dropdown = this.page.locator("//select[@id='scheduledAutoReleaseAfter']");
        this.admin_Space_zone_Advanced_Settings_tab_button = this.page.locator("//button[@id='pills-advanced-tab']");
        this.admin_Space_zone_Advanced_Settings_tab_label_first = this.page.locator("//div[@id='pills-advanced']//p[text()='Allow restrictions to be lifted']");
        this.admin_Space_zone_Advanced_Settings_tab_label = this.page.locator("//div[@id='pills-advanced']//p");
        this.admin_Spaces_Spot_Advanced_Settings_Hover_Texts = this.page.locator("//div[@id='pills-advanced']//p/parent::div//div");
        this.admin_Space_zone_Advanced_Settings_AllowLiftRestriction_toggle = this.page.locator("//input[@name = 'AllowLiftRestriction']");
        this.admin_Space_zone_Advanced_Settings_Swipecardaccess_toggle = this.page.locator("//input[@name = 'Swipecardaccess']");

        this.admin_Space_zone_Advanced_Settings_new_bookable_day_respects_office_closures_toggle = this.page.locator("//input[@name = 'new_bookable_day_respects_office_closures']");
        this.admin_Space_zone_Advanced_Settings_minimum_advance_reservation_check_toggle = this.page.locator("//input[@name = 'minimum_advance_reservation_check']");
        this.admin_Space_zone_Advanced_Settings_daily_booking_limit_check_toggle = this.page.locator("//input[@name = 'daily_booking_limit_check']");
        this.admin_Space_zone_Advanced_Settings_SocialDistancing_toggle = this.page.locator("//input[@name = 'SocialDistancing']");

        this.admin_Space_zone_Advanced_Settings_FlgInstanceRelease_Dropdown = this.page.locator("//select[@id = 'FlgInstanceRelease']");
        this.admin_Space_zone_Advanced_Settings_randomBookTimeType_Dropdown = this.page.locator("//select[@id = 'randomBookTimeType']");
        this.admin_Space_zone_Advanced_Settings_randomBookTime_input = this.page.locator("//input[@name = 'randomBookTime']");
        this.admin_Space_zone_Advanced_Settings_NoBookingsBefore_Dropdown = this.page.locator("//select[@id='NoBookingsBefore']");
        this.admin_Space_zone_Advanced_Settings_DailyBookingLimit_input = this.page.locator("//input[@id='DailyBookingLimit']");
        this.admin_Space_zone_Privacy_tab_button = this.page.locator("//button[@id='pills-privacy-tab']");
        this.admin_Space_zone_Privacy_tab_label_first = this.page.locator("//div[@id='pills-privacy']//p[text()='Show bookings to users']");
        this.admin_Space_zone_Privacy_tab_label = this.page.locator("//div[@id='pills-privacy']//p");
        this.admin_Space_zone_Privacy_tab_label_Hover = this.page.locator("//div[@id='pills-privacy']//p/parent::div//div");

        this.admin_Space_zone_Privacy_tab_BookingsViewableByStaff_Dropdown = this.page.locator("//select[@id='BookingsViewableByStaff']");

        this.admin_Space_zone_Privacy_tab_AccessToSearchAllZones_toggle = this.page.locator("//input[@id='AccessToSearchAllZones']");

        //Parking Spaces page 

        this.admin_Parking_Spaces_zone_id_Dropdown = this.page.locator("//select[@id='zone_id']");
        this.admin_Parking_Spaces_Header_text = this.page.locator("//span[@ref='eText']");
        this.admin_Parking_Spaces_Add_Parking_Space_Button = this.page.locator("//a[@type='button' and text()='Add parking space']");
        this.admin_Parking_Spaces_Add_Parking_Space_Popup = this.page.locator("//h2[text()='Creating a new parking space']");
        this.admin_Parking_Spaces_Add_Parking_Space_Popup2 = this.page.locator("//span[contains(text(),'Complete the fields')]");
        this.admin_Parking_Spaces_Add_Parking_Space_Popup3 = this.page.locator("//p[contains(text(),'If using a map,')]");
        this.admin_Parking_Spaces_Add_Parking_Space_popup_label = this.page.locator("//div[label]/label");

        this.admin_Parking_Spaces_car_park_id_Dropdown = this.page.locator("//select[@id='car_park_id']");

        this.admin_Parking_Spaces_parking_number_input = this.page.locator("//input[@id='parking_number']");
        this.admin_Parking_Spaces_name_filter_input = this.page.locator("//input[@aria-label='Name Filter Input']");


        this.admin_Parking_Spaces_Edit_Parking_Space_Button_first = this.page.locator("(//a[@aria-label='Edit'])[1]");
        this.admin_Parking_Spaces_Delete_Parking_Space_Button_first = this.page.locator("(//div[@col-id='Action']//a)[3]");
        this.admin_Parking_Spaces_Created_parking_spot_first = this.page.locator("(//div[@col-id='ParkingBayNumber']//a)[1]");

        this.admin_Parking_Spaces_Cancel_input_text_button = this.page.locator("//input[@id='canceltext']");

        this.admin_Spot_SideBar_Space_number_input_value_2 = this.page.locator("(//input[@id='parking_number'])[2]");

        this.admin_Spot_SideBar_Space_number_label = this.page.locator("//p[contains(text(),'Space number')]");
        this.admin_Spot_SideBar_Space_size_label = this.page.locator("//p[contains(text(),'Space size')]");
        this.admin_Spot_SideBar_Fuel_types_label = this.page.locator("//p[contains(text(),'Fuel types')]");
        this.admin_Spot_SideBar_Accessibility_label = this.page.locator("//p[contains(text(),'Accessibility')]");
        this.admin_Spot_SideBar_Vehicle_sharing_label = this.page.locator("//p[contains(text(),'Vehicle sharing')]");
        this.admin_Spot_SideBar_Ranking_value_label = this.page.locator("//p[contains(text(),'Ranking value')]");
        this.admin_Spot_SideBar_Available_days_label = this.page.locator("//p[contains(text(),'Available days')]");
        this.admin_Spot_SideBar_Available_from_label = this.page.locator("//p[contains(text(),'Available from')]");
        this.admin_Spot_SideBar_Booking_period_label = this.page.locator("//p[contains(text(),'Booking period')]");
        this.admin_Spot_SideBar_Status_label = this.page.locator("//p[contains(text(),'Status')]");
        this.admin_Spot_SideBar_Restrict_bookings_by_users_label = this.page.locator("//p[contains(text(),'Restrict bookings by users')]");


        this.admin_Spot_SideBar_Space_number_hover = this.page.locator("//p[contains(text(),'Space number')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Space_size_hover = this.page.locator("//p[contains(text(),'Space size')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Fuel_types_hover = this.page.locator("//p[contains(text(),'Fuel types')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Accessibility_hover = this.page.locator("//p[contains(text(),'Accessibility')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Vehicle_sharing_hover = this.page.locator("//p[contains(text(),'Vehicle sharing')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Ranking_value_hover = this.page.locator("//p[contains(text(),'Ranking value')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Available_days_hover = this.page.locator("//p[contains(text(),'Available days')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Available_from_hover = this.page.locator("//p[contains(text(),'Available from')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Booking_period_hover = this.page.locator("//p[contains(text(),'Booking period')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Status_hover = this.page.locator("//p[contains(text(),'Status')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Restrict_bookings_by_users_hover = this.page.locator("//p[contains(text(),'Restrict bookings by users')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Close_button = this.page.locator("//button[@aria-label='Close'][text()='Cancel']");
        this.admin_Spot_SideBar_Submit_button = this.page.locator("//button[@id='submit']");
        this.admin_Spot_SideBar_Select_All_button = this.page.locator("//select[@class='ctm-select VehicleTypeId multiple']//parent::div");
        this.admin_Spot_SideBar_Select_All_checkbox = this.page.locator("//select[contains(@class, 'VehicleTypeId multiple')]/following-sibling::div//li[contains(@class, 'multiselect-all')]");
        this.admin_Spot_SideBar_Fuel_Types_Select_All_button = this.page.locator("(//select[contains(@class, 'fuelCategoryId')]/parent::div)[2]");
        this.admin_Spot_SideBar_Fuel_Types_Select_All_checkbox = this.page.locator("(//select[contains(@class, 'fuelCategoryId')]/following-sibling::div//li[contains(@class, 'multiselect-all')])[2]");
        this.admin_Spot_SideBar_Accessibility_Select_All_button = this.page.locator("(//select[contains(@class, 'accessibleCategoryId')]/parent::div)[2]");
        this.admin_Spot_SideBar_Accessibility_Select_All_checkbox = this.page.locator("(//select[contains(@class, 'accessibleCategoryId')]/following-sibling::div//li[contains(@class, 'multiselect-all')])[2]");
        this.admin_Spot_SideBar_Shareable_Select_All_button = this.page.locator("(//select[contains(@class, 'shareableCategoryId')]/parent::div)[2]");
        this.admin_Spot_SideBar_Shareable_Select_All_checkbox = this.page.locator("(//select[contains(@class, 'shareableCategoryId')]/following-sibling::div//li[contains(@class, 'multiselect-all')])[2]");
        this.admin_Spot_SideBar_Confirm_deleted_button = this.page.locator("//button[@id='actbtn']");
        this.admin_Spot_SideBar_Ranking_value_Input = this.page.locator("//input[@id='parking_value']");
        this.admin_Spot_SideBar_Available_days_Input = this.page.locator("//input[@id='available_days']");
        this.admin_Spot_SideBar_Available_from_Input = this.page.locator("//input[@id='SpotAvailableTimeFld']");
        this.admin_Spot_SideBar_Booking_period_radio = this.page.locator("//input[@id='BookingPeriod']");
        this.admin_Spot_SideBar_All_day_radio = this.page.locator("//input[@type='radio' and @id='AllDayBooking']");
        this.admin_Spot_SideBar_Hourly_radio = this.page.locator("//input[@type='radio' and @id='HourlyBooking']");
        this.admin_Spot_SideBar_Status_dropdown = this.page.locator("//select[@id='status']");
        this.admin_Spot_SideBar_Restrict_bookings_by_users_toggle = this.page.locator("//input[@id='restricted']");

        this.admin_Spot_Desk_Add_desk_button = this.page.locator("//a[@type='button' and @title='Add desk']");
        this.admin_Spot_Desk_Add_desk_Popup_header_text = this.page.locator("//h2[@id='addDeskModalLabel']");

        this.admin_Spot_Desk_Add_desk_Popup_header_text2 = this.page.locator("//span[contains(text(),'Complete the fields')]");
        this.admin_Spot_Desk_Add_desk_Meeting_Room_button = this.page.locator("//a[@type='button' and @title='Add meeting room']");


        this.admin_Spot_Add_Meeting_Popup_header_text = this.page.locator("//h2[@id='addMeetingRoomModalLabel']");

        this.admin_Spot_Add_Meeting_Popup_label = this.page.locator("//form[@id='SpotForm']//div[label]/label");
        this.admin_Spot_Add_Meeting_Popup_capacity_input = this.page.locator("//input[@id='capacity']");

        this.admin_Spot_Add_Meeting_Popup_room_name_input = this.page.locator("//input[@aria-label='Room name Filter Input']");


        this.admin_Spot_Add_Meeting_Popup_room_name_input_room_name = this.page.locator("(//input[@id='room_name'])[1]");



        this.admin_Spot_SideBar_Room_name_label = this.page.locator("//p[contains(text(),'Room name')]");
        this.admin_Spot_SideBar_Room_capacity_label = this.page.locator("//p[contains(text(),'Room capacity')]");
        this.admin_Spot_SideBar_Available_days_label_2 = this.page.locator("//p[contains(text(),'Available days')]");
        this.admin_Spot_SideBar_Room_available_time_label = this.page.locator("//p[contains(text(),'Room available time')]");
        this.admin_Spot_SideBar_Start_booking_time_label = this.page.locator("//p[contains(text(),'Start booking time')]");
        this.admin_Spot_SideBar_End_booking_time_label = this.page.locator("//p[contains(text(),'End booking time')]");
        this.admin_Spot_SideBar_Restrict_booking_duration_label = this.page.locator("//p[contains(text(),'Restrict booking duration')]");
        this.admin_Spot_SideBar_External_bookings_via_email_label = this.page.locator("//p[contains(text(),'External bookings via email')]");
        this.admin_Spot_SideBar_Status_label_2 = this.page.locator("//p[contains(text(),'Status')]");
        this.admin_Spot_SideBar_Require_organiser_check_in_label = this.page.locator("//p[contains(text(),'Require organiser check-in')]");
        this.admin_Spot_SideBar_Restrict_bookings_by_users_label_2 = this.page.locator("//p[contains(text(),'Restrict bookings by users')]");
        this.admin_Spot_SideBar_Require_meeting_approval_label = this.page.locator("//p[contains(text(),'Require meeting approval')]");

        this.admin_Spot_SideBar_Room_name_hover = this.page.locator("//p[contains(text(),'Room name')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Room_capacity_hover = this.page.locator("//p[contains(text(),'Room capacity')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Available_days_hover_2 = this.page.locator("//p[contains(text(),'Available days')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Room_available_time_hover = this.page.locator("//p[contains(text(),'Room available time')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Start_booking_time_hover = this.page.locator("//p[contains(text(),'Start booking time')]/preceding-sibling::div");
        this.admin_Spot_SideBar_End_booking_time_hover = this.page.locator("//p[contains(text(),'End booking time')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Restrict_booking_duration_hover = this.page.locator("//p[contains(text(),'Restrict booking duration')]/preceding-sibling::div");
        this.admin_Spot_SideBar_External_bookings_via_email_hover = this.page.locator("//p[contains(text(),'External bookings via email')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Status_hover_2 = this.page.locator("//p[contains(text(),'Status')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Require_organiser_check_in_hover = this.page.locator("//p[contains(text(),'Require organiser check-in')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Restrict_bookings_by_users_hover_2 = this.page.locator("//p[contains(text(),'Restrict bookings by users')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Require_meeting_approval_hover = this.page.locator("//p[contains(text(),'Require meeting approval')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Restrict_booking_duration_toggle = this.page.locator("//input[@id='RestrictBookingDuration']");
        this.admin_Spot_SideBar_Restrict_booking_duration_slot = this.page.locator("//select[@id='RestrictBookingDurationSlot']");
        this.admin_Spot_SideBar_Require_organiser_check_in_check_box = this.page.locator("//input[@id='organiser_check_in_required']");
        this.admin_Spot_SideBar_Require_organiser_check_in_check_box_2 = this.page.locator("(//div[@class='check-border'])[1]");

        this.admin_Spot_SideBar_QR_code_label = this.page.locator("//p[contains(text(),'QR code')]");
        this.admin_Spot_SideBar_Check_in_reminder_label = this.page.locator("(//p[contains(text(),'Check-in reminder')])[1]");
        this.admin_Spot_SideBar_Check_in_reminder_time_label = this.page.locator("//p[contains(text(),'Check-in reminder time')]");
        this.admin_Spot_SideBar_Auto_release_label = this.page.locator("(//p[contains(text(),'Auto-release')])[1]");
        this.admin_Spot_SideBar_Auto_release_after_label = this.page.locator("//p[contains(text(),'Auto-release after')]");

        this.admin_Spot_SideBar_QR_code_hover = this.page.locator("//p[contains(text(),'QR code')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Check_in_reminder_hover = this.page.locator("(//p[contains(text(),'Check-in reminder')]/preceding-sibling::div)[1]");
        this.admin_Spot_SideBar_Check_in_reminder_time_hover = this.page.locator("//p[contains(text(),'Check-in reminder time')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Auto_release_hover = this.page.locator("(//p[contains(text(),'Auto-release')]/preceding-sibling::div)[1]");
        this.admin_Spot_SideBar_Auto_release_after_hover = this.page.locator("//p[contains(text(),'Auto-release after')]/preceding-sibling::div");
        this.admin_Spot_SideBar_Status_dropdown = this.page.locator("//select[@name='status']");

        this.admin_Spot_SideBar_Check_in_reminder_check_toggle = this.page.locator("//input[@id='checkInReminder']");
        this.admin_Spot_SideBar_Auto_release_check_toggle = this.page.locator("//input[@id='autoRelease']");
        this.admin_Spot_SideBar_Check_in_reminder_time_dropdown = this.page.locator("//select[@id='checkInReminderTime']");
        this.admin_Spot_SideBar_Auto_release_after_dropdown = this.page.locator("//select[@id='autoReleaseAfter']");

        this.admin_Spot_SideBar_Configure_button = this.page.locator("//button[contains(text(),'Configure')]");

        this.admin_Spot_SideBar_Status_modal = this.page.locator("//h2[@id='statusModal1Label']");
        this.admin_Spot_SideBar_Status_modal_text = this.page.locator("(//div[contains(@id,'statusModal1')]//div)[5]//span");

        this.admin_Spot_SideBar_Date_input = this.page.locator("//input[@id='date']");
        this.admin_Spot_SideBar_Cancel_button = this.page.locator("//button[@id='cleardate'][text()='Cancel']");


        this.admin_Spot_SideBar_Restrict_bookings_by_users_button = this.page.locator("//button[@id='restrictedbtn']");


        this.admin_Spot_SideBar_Enable_Day_Restrictions_Checkbox = this.page.locator("//input[@id='EnableDayRestrictions']");

        this.admin_Spot_SideBar_Restriction_Cancel_Button = this.page.locator("//div[@id='RescrictionOption']//button[@aria-label='Close']");

        this.admin_Spot_SideBar_Restrict_Bookings_By_Users_Toggle = this.page.locator("//input[@name='restricted']");

        this.admin_Spot_SideBar_Approval_Needed_Checkbox = this.page.locator("//input[@id='approval_needed']");

        this.admin_Spot_SideBar_Approval_Needed_Edit_Button = this.page.locator("//button[@id='approvalneeded_edit_btn']");

        this.admin_Spot_SideBar_Approval_Needed_Modal_Header = this.page.locator("//h2[@id='approvalneededOptionModalLabel']");


        this.admin_User_Tab_Email_Filter_Input = this.page.locator("//input[@aria-label='Email address Filter Input']");
        this.admin_User_Tab_View_More_Button = this.page.locator("(//div[@ref='eBody']//button)[1]");
        this.admin_User_Tab_Clear_All_Bookings_Button = this.page.locator("//ul//a[contains(text(), 'Clear all bookings')]");
        this.admin_User_Tab_Clear_All_Bookings_Modal_Header = this.page.locator("//button[@id='clearallBookingsave']");
        this.admin_User_Tab_Employee_Add_Employee_Button = this.page.locator("//a[text()='Add employee']");
        this.admin_User_Tab_Employee_Add_Employee_form_labels = this.page.locator(" //form[@id='userForm']//p");
        this.admin_User_Tab_Employee_Add_Employee_form_PrimaryEmail_Input = this.page.locator("//input[@id='PrimaryEmail']");
        this.admin_User_Tab_Employee_Add_Employee_form_FirstName_Input = this.page.locator("//input[@id='FirstName']");
        this.admin_User_Tab_Employee_Add_Employee_form_LastName_Input = this.page.locator("//input[@id='LastName']");
        this.admin_User_Tab_Employee_Add_Employee_form_Password_Input = this.page.locator("//input[@id='password']");
        this.admin_User_Tab_Employee_Add_Employee_form_Group_Select = this.page.locator("//select[@id='group']");
        this.admin_User_Tab_Employee_Add_Employee_form_Zone_Select = this.page.locator("//select[@id='zone']");
        this.admin_User_Tab_Employee_Add_Employee_form_NotifyRegUser_Checkbox = this.page.locator("//input[@id='notifyRegUser']");
        this.admin_User_Tab_Employee_Add_Employee_form_Add_Button = this.page.locator("//button[@id='add']");

        this.admin_User_Tab_Employee_Add_Employee_form_Cancel_Button = this.page.locator("//a[normalize-space()='Cancel']");
        this.admin_User_Tab_Employee_Add_Employee_form_Upload_Button = this.page.locator("//a[@id='upload_employees']");
        this.admin_User_Tab_Employee_Add_Employee_form_Export_Button = this.page.locator("//a[@id='export_employees']");
        this.admin_User_Tab_Employee_Add_Employee_form_Export_Modal_Header = this.page.locator("//h2[@id='exportEmployeeListModalLabel']");
        this.admin_User_Tab_Employee_Add_Employee_form_Export_Modal_Text = this.page.locator("//div[@id='export_employees_list_panel']//p");

        this.admin_User_Tab_Employee_Export_Employee_Button = this.page.locator("//a[@id='export_employees']");
        this.admin_User_Tab_Employee_Export_Employee_Form_Close_Button = this.page.locator("//h2[@id='exportEmployeeListModalLabel']/following-sibling::button[@class='btn-close']");

        this.admin_User_Tab_Admin_Add_Admin_Button = this.page.locator("//a[text()='Add administrator']");
        this.admin_User_Tab_Employee_Export_Employee_Form_Email_Label = this.page.locator("//p[text()='Email']");
        this.admin_Add_Admin_First_Name_Label = this.page.locator("//p[contains(text(),'First name')]");
        this.admin_Add_Admin_Last_Name_Label = this.page.locator("//p[contains(text(),'Last name')]");
        this.admin_Add_Admin_Multifactor_Authentication_Label = this.page.locator("//p[contains(text(),'Multifactor authentication')]");
        this.admin_Add_Admin_Permission_Level_Label = this.page.locator("//p[contains(text(),'Permission level')]");
        this.admin_Add_Admin_Zone_Label = this.page.locator("//p[contains(text(),'Zone')]");
        this.admin_Add_Admin_Password_Label = this.page.locator("(//p[contains(text(),'Password')])[1]");
        this.admin_Add_Admin_New_User_Signup_Alerts_Label = this.page.locator("//p[contains(text(),'New user sign-up alerts')]");

        this.admin_Add_Admin_Email_Input = this.page.locator("//input[@id='email']");
        this.admin_Add_Admin_First_Name_Input = this.page.locator("//input[@id='firstname']");
        this.admin_Add_Admin_Last_Name_Input = this.page.locator("//input[@id='lastname']");
        this.admin_Add_Admin_Multifactor_Authentication_Input = this.page.locator("//input[@id='MFA_status']");
        this.admin_Add_Admin_Permission_Level_Input = this.page.locator("//select[@id='permission']");
        this.admin_Add_Admin_Zone_Input = this.page.locator("//select[@id='zones']");
        this.admin_Add_Admin_Password_Input = this.page.locator("(//input[@id='password'])[1]");
        this.admin_Add_Admin_New_User_Signup_Alerts_Input = this.page.locator("(//input[@id='recEmailUpdate'])[1]");
        this.admin_Add_Admin_Zone_Input_Click = this.page.locator("//button[@title='None selected']");
        this.admin_Add_Admin_Zone_Input_Multiselect_All = this.page.locator("//input[@value='multiselect-all']");
        this.admin_Add_Admin_Close_Button = this.page.locator("//div[@class='btn-input']//button[@aria-label='Close']");

        this.admin_Add_Admin_Submit_Button = this.page.locator("//button[@id='submit']");
        this.admin_Add_Admin_Submit_Button_Header_text = this.page.locator("//i[@class='fa fa-info-circle']");

        this.admin_Add_Admin_Domain_Input = this.page.locator("//input[@id='adminalertEmail']");
        this.admin_Add_Admin_Domain_Input_Update_Button = this.page.locator("//button[@id='update_domain']");

        this.admin_Add_Admin_Add_Group_Button = this.page.locator("//a[text()='Add group']");
        this.admin_Add_Admin_Add_Group_Button_Header_Text = this.page.locator("//h2[text()='Add group']");


        this.admin_Add_Group_Name_Label = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Name']");
        this.admin_Add_Group_Default_Zone_Label = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Default zone']");
        this.admin_Add_Group_Available_Days_Label = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Available days']");
        this.admin_Add_Group_Join_Waitlist_Label = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Join the waitlist']");
        this.admin_Add_Group_Daily_Booking_Limit_Label = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Daily booking limit']");
        this.admin_Add_Group_Credit_Refill_Label = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Credit refill']");
        this.admin_Add_Group_Credit_Refill_Cycle_Label = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Credit refill cycle']");
        this.admin_Add_Group_Default_Credit_Balance_Label = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Default credit balance']");


        this.admin_Add_Group_Name_Hover = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Name']/preceding-sibling::div");
        this.admin_Add_Group_Default_Zone_Hover = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Default zone']/preceding-sibling::div");
        this.admin_Add_Group_Available_Days_Hover = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Available days']/preceding-sibling::div");
        this.admin_Add_Group_Join_Waitlist_Hover = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Join the waitlist']/preceding-sibling::div");
        this.admin_Add_Group_Daily_Booking_Limit_Hover = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Daily booking limit']/preceding-sibling::div");
        this.admin_Add_Group_Credit_Refill_Hover = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Credit refill']/preceding-sibling::div");
        this.admin_Add_Group_Credit_Refill_Cycle_Hover = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Credit refill cycle']/preceding-sibling::div");
        this.admin_Add_Group_Default_Credit_Balance_Hover = this.page.locator("//div[@class='tab-form zone-edit-tab']//p[text()='Default credit balance']/preceding-sibling::div");


        this.admin_Add_Group_Name_Input = this.page.locator("//input[@id='Name']");
        this.admin_Add_Group_Default_Zone_Select = this.page.locator("//select[@id='DefaultZoneID']");
        this.admin_Add_Group_Available_Days_Input = this.page.locator("//input[@id='AvailableDays']");
        this.admin_Add_Group_Queue_User_Select = this.page.locator("//select[@id='QueueUser']");
        this.admin_Add_Group_Booking_Limit_Input = this.page.locator("//input[@id='GroupBookingLimit']");

        this.admin_Add_Group_Credit_Refill_Input = this.page.locator("//input[@id='CreditRefill']");
        this.admin_Add_Group_Default_Credit_Balance_Input = this.page.locator("//input[@id='DefaultCreditBalance']");

        this.admin_Add_Group_Credit_Refill_Cycle_Select = this.page.locator("//select[@id='CreditRefillCycle']");


        this.admin_Add_Group_Cancel_Button = this.page.locator("//button[@aria-label='Close'][normalize-space()='Cancel']");
        this.admin_Add_Group_Submit_Button = this.page.locator("//span[@class='btn-text']");

        this.admin_Add_Group_Name_Filter_Input = this.page.locator("//input[@aria-label='Group name Filter Input']");

        this.admin_Created_Group_Button_First = this.page.locator("(//div[@col-id='Name']//a)[1]");


        this.admin_Delete_Group_Button_First = this.page.locator("(//a[@aria-label='Delete group'])[1]");

        this.admin_Delete_Group_Confirm_Button = this.page.locator("//button[@id='delete_group']");


        this.admin_Add_Team_Button = this.page.locator("//a[text()='Add team']");
        this.admin_Add_Teame_Name_Input = this.page.locator("//input[@id='Name']");
        this.admin_Add_Teame_Name_popuo_header = this.page.locator("//h2[@id='addGroupModallLabel']");
        this.admin_Add_Teame_Name_popuo_header_add_button = this.page.locator("//button[text()='Add']");

        this.admin_Edit_Team_Delete_Button_First = this.page.locator("(//div[@col-id='Action']//a)[2]");


        this.admin_Team_Name_Filter_Input = this.page.locator("//input[@aria-label='Team name Filter Input']");
        this.admin_Team_Delete_Button = this.page.locator("//button[@id='delete_question']");

        this.admin_Group_Team_Members_Count_Link = this.page.locator("(//div[@col-id='GroupUsersCount']//a)[1]");

        this.admin_Group_Team_Members_Edit_Header_Text = this.page.locator("//h3//strong");

        this.admin_Group_Team_Members_Edit_Status_Checkbox = this.page.locator("//input[@name='GroupUserStatus']");

        this.admin_Group_Team_Members_Edit_CheckBox_search = this.page.locator("//input[@aria-label='First name Filter Input']");


        this.admin_Add_Role_Button = this.page.locator("//a[text()='Add role']");
        this.admin_Add_Role_Name_Input = this.page.locator("//input[@aria-label='Role name Filter Input']");
        this.admin_Add_Role_Popup_Header = this.page.locator("//h2[text()='Add role']");
        this.admin_Add_Role_Input = this.page.locator("//input[@id='Employee_Role']");
        this.admin_Add_Role_Select_icon = this.page.locator("//select[@id='mySelect']");
        this.admin_Add_Role_Select_icon_No_employee_first = this.page.locator("(//a[@aria-controls='offcanvasRight'])[1]");

        this.admin_Add_Role_Select_icon_No_employee_first_Header = this.page.locator("//h2[@id='no_of_employee_modal_title']");

        this.admin_Add_Role_Select_icon_No_employee_first_Input = this.page.locator("//input[@aria-label='First name Filter Input']");


        this.admin_Add_Role_Select_icon_No_employee_first_Checkbox = this.page.locator("(//input[@name='RoleUserStatus'])[1]");

        this.admin_Add_Role_Select_icon_No_employee_first_Close_Button = this.page.locator("//div[@class='offcanvas-header modal-hedaer-border-bottom']//button[@aria-label='Close']");
        this.admin_Add_Role_Select_icon_No_employee_first_Cancel_Button_text = this.page.locator("//input[@id='canceltext']");
        this.admin_Emergency_Role_Delete_Button = this.page.locator("//button[@id='Cancelbtn']");


        this.admin_Accounts_general_settings_tabs = this.page.locator("//ul[@id='pills-tab']//button");


        this.admin_Accounts_general_Company_settings_Company_name_labels = this.page.locator("//p[text()='Company name']");
        this.admin_Accounts_general_Company_settings_Time_zone_labels = this.page.locator("//p[text()='Time zone']");
        this.admin_Accounts_general_Company_settings_Default_language_labels = this.page.locator("//p[text()='Default language']");
        this.admin_Accounts_general_Company_settings_Support_email_address_labels = this.page.locator("//p[text()='Support email address']");
        this.admin_Accounts_general_Company_settings_Rectangular_logo_labels = this.page.locator("//p[text()='Rectangular logo']");
        this.admin_Accounts_general_Company_settings_Square_logo_labels = this.page.locator("//p[text()='Square logo']");


        this.admin_Accounts_general_Company_settings_Company_name_hover = this.page.locator("//p[text()='Company name']/preceding-sibling::div");
        this.admin_Accounts_general_Company_settings_Time_zone_hover = this.page.locator("//p[text()='Time zone']/preceding-sibling::div");
        this.admin_Accounts_general_Company_settings_Default_language_hover = this.page.locator("//p[text()='Default language']/preceding-sibling::div");
        this.admin_Accounts_general_Company_settings_Support_email_address_hover = this.page.locator("//p[text()='Support email address']/preceding-sibling::div");
        this.admin_Accounts_general_Company_settings_Rectangular_logo_hover = this.page.locator("//p[text()='Rectangular logo']/preceding-sibling::div");
        this.admin_Accounts_general_Company_settings_Square_logo_hover = this.page.locator("//p[text()='Square logo']/preceding-sibling::div");


        this.admin_Accounts_general_Company_settings_Company_name_input = this.page.locator("//input[@id='company_name']");

        this.admin_Accounts_general_Company_settings_Time_zone_input = this.page.locator("//select[@id='timezone']");
        this.admin_Accounts_general_Company_settings_Default_language_input = this.page.locator("//select[@id='language']");

        this.admin_Accounts_general_Company_settings_Rectangular_logo_input = this.page.locator("//input[@id='company_logo_thumbnail']");

        this.admin_Accounts_general_Company_settings_Square_logo_input = this.page.locator("//input[@id='company_logo']");


        this.admin_Accounts_general_Employee_settings_labels = this.page.locator("//form[@id='EmployeeSettingForm']//p");
        this.admin_Accounts_general_Employee_settings_hover = this.page.locator("//form[@id='EmployeeSettingForm']//p/preceding-sibling::div");

        this.admin_Accounts_general_Employee_settings_input = this.page.locator("//input[@id='EmployeeChangeGroup']");
        this.admin_Accounts_general_Employee_settings_Disable_Access_Car_Plate_input = this.page.locator("//input[@id='Disable_Employee_Access_Car_Plate']");
        this.admin_Accounts_general_Employee_settings_IsSessionATimeoutRequired_input = this.page.locator("//input[@id='IsSessionATimeoutRequired']");


        this.admin_Accounts_general_Employee_settings_Save_button = this.page.locator("//button[@id='EmployeeSettingSubmit']");

        this.admin_Accounts_general_Group_zones_add_groupButton = this.page.locator("//button[text()='Group zones']");

        this.admin_Accounts_general_Group_zones_popup_header_text = this.page.locator("//h2[@id='addGroupModalLabel']");

        this.admin_Accounts_general_Group_zones_popup_group_name_label = this.page.locator("//label[@for='groupname']");

        this.admin_Accounts_general_Group_zones_popup_group_type_select = this.page.locator("//select[@id='groupType']");


        this.admin_Accounts_general_Group_zones_popup_group_name_input = this.page.locator("//input[@id='groupName']");
        this.admin_Accounts_select_MultipleZone = this.page.locator("//input[@value='multiselect-all']");
        this.admin_Accounts_select_ZoneToGroup = this.page.locator("(//div[@class='btn-group']//button)[1]");


        this.admin_Accounts_general_Group_zones_popup_restrict_employee_booking_label = this.page.locator("//label[contains(text(), 'Limit employees')]");
        this.admin_Accounts_general_Group_zones_popup_restrict_employee_single_booking_input = this.page.locator("//input[@id='restricted_employee_for_single_bookingstatus']");


        this.admin_Accounts_general_Group_zones_popup_confirm_button = this.page.locator("//button[contains(@class, 'confirmbtn')]");


        this.admin_Accounts_general_Group_zones_created_group_first = this.page.locator("(//div[@ref='eContainer']//div[@col-id='groupName'])[1]");
        this.admin_Accounts_general_Group_zones_delete_button = this.page.locator("//div[@id='DeleteZoneGroupModal']//button[contains(text(), 'Delete')]");
        this.admin_Accounts_general_Security_questions_add_question_button = this.page.locator("//a[text()='Add alert']");

        this.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_header = this.page.locator("//h2[text()='Add admin alert']");

        this.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_zone_name_label = this.page.locator("//div[contains(@class,'car_park_nameSingleiDiv')]//p[text()='Zone name']");

        this.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Alert_type_label = this.page.locator("//p[text()='Alert type']");

        this.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_zone_name_input = this.page.locator("//select[@name='car_park_id']");

        this.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Alert_type_input = this.page.locator("//select[@name='alert_type']");

        this.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Email_Template_label = this.page.locator("//div[contains(@class,'alert_bookingandreleasing_div')]//p");

        this.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Email_Template_input = this.page.locator("//select[@id='alert_bookingandreleasing']");

        this.admin_Accounts_general_Security_questions_add_admin_alert_sidebar_Alert_preview_label = this.page.locator("//p[text()='Alert preview']");
        this.admin_Accounts_alert_sidebar_Alert_preview_text = this.page.locator("//p[contains(text(),'The content below')]");
        this.admin_Accounts_alert_sidebar_Email_Subject_text = this.page.locator("//p[@class='EMail-Subject']");
        this.admin_Accounts_alert_sidebar_Email_Content_text = this.page.locator("//p[@class='EMail-Content']");
        this.admin_Accounts_alert_sidebar_Add_Recipients_label = this.page.locator("//p[contains(text(),'Add up to 4 recipients')]");
        this.admin_Accounts_alert_sidebar_Email_address_1_Label = this.page.locator("//p[text()='Email address 1']");
        this.admin_Accounts_alert_sidebar_Email_address_1_Input = this.page.locator("//input[@id='adminalertEmail1']");
        this.admin_Accounts_alert_sidebar_Email_add_Button = this.page.locator("//button[@id='submit']");

        this.admin_Accounts_alert_sidebar_Email_address_1_input = this.page.locator("//input[@aria-label='Email address 1 Filter Input']");
        this.admin_Accounts_alert__Delete_Button = this.page.locator("//button[@id='delete_admin_alert']");

        this.admin_Accounts_general_Security_questions_add_question_new_button = this.page.locator("//a[text()='Add question']");

        this.admin_Accounts_general_Security_questions_add_question_new_button_header = this.page.locator("//h2[text()='Add question']");

        this.admin_Accounts_general_Security_questions_add_question_new_button_labels = this.page.locator("//div[@class='col-4']//p");

        this.admin_Accounts_general_Security_questions_add_question_new_button_topic_input = this.page.locator("//input[@id='topic']");


        this.admin_Accounts_general_Security_questions_add_question_new_button_editor_area = this.page.locator("//div[@aria-label='Editor editing area: main. Press Alt+0 for help.']");


        this.admin_Accounts_general_Security_questions_add_question_new_button_zone_button = this.page.locator("//span[@class='multiselect-selected-text']");

        this.admin_Accounts_general_Security_questions_add_question_new_button_zone_select = this.page.locator("//select[@id='zones']");

        this.admin_Accounts_general_Security_questions_add_question_new_button_status_select = this.page.locator("//select[@name='status']");


        this.admin_Accounts_general_Security_questions_add_question_new_button_mandatory_checkbox_2 = this.page.locator("(//label//input)[2]");
        this.admin_Accounts_general_Security_questions_add_question_new_button_add_button = this.page.locator("//button[text()='Add']");

        this.admin_Accounts_general_Security_questions_add_question_new_button_update_button = this.page.locator("//button[text()='Update']");
        this.admin_Accounts_question_filter_input = this.page.locator("//input[@aria-label='Question Filter Input']");

        this.admin_Edit_Button_First = this.page.locator("(//div[@col-id='Action']//a)[1]");

        this.admin_Accounts_general_Security_questions_add_question_new_button_delete_button = this.page.locator("//button[@id='delete_question']");
        this.admin_Accounts_general_Security_Post_questions_add_question_new_button_header = this.page.locator("//h2[text()='Add new question']");


        this.admin_Accounts_general_Security_questions_add_question_new_button_question_input = this.page.locator("//input[@id='question']");

        this.admin_Accounts_general_Security_questions_add_question_new_button_ans_required_toggle = this.page.locator("//input[@id='ansRequired']");

        this.admin_Accounts_general_Security_questions_add_question_new_button_ans_type_select = this.page.locator("//select[@id='ansType']");

        this.admin_Accounts_general_Security_questions_add_question_new_button_ans_input = this.page.locator("//input[@id='answer']");

        this.admin_Accounts_add_post_question_new_button_add_button = this.page.locator("//button[@id='add']");
        this.admin_Reports_Tabale_Headers = this.page.locator("//span[@ref='eText' and text()]");
        this.admin_Reports_Export_Button = this.page.locator("//a[@title='Export']");

       
        this.admin_Reports_Date_Range_Input = this.page.locator("//input[@name='daterange']");
        this.admin_Reports_Date_Range_Option = this.page.locator("//div[@class='ranges']//li");
        this.admin_Reports_firstRowCells = this.page.locator("(//div[@ref='eContainer']//div[@role='row'])[1]//div");
        
        this.admin_Reports_export = this.page.locator("//*[@id='exportCSVButton']");
        this.morningCancellationsExportCSVButton = this.page.locator("//*[@id='morningCancellationsExportCSVButton']");

        this.admin_Reports_Parking_Free_Booking_Report_Select = this.page.locator("//select[@id='car_park_freebooking_report']");

        this.EmergencyRolesExportCSVButton = this.page.locator("//*[@id='EmergencyRolesExportCSVButton']");
        this.RoomUsageExportCSVButton = this.page.locator("//*[@id='RoomUsageExportCSVButton']");
        this.unusedBookingExportCSVButton = this.page.locator("//*[@id='unusedBookingExportCSVButton']");

        this.bookingdemandexportCSVButton = this.page.locator("//*[@id='bookingdemandexportCSVButton']");

        this.CheckInExportCSVButton = this.page.locator("//*[@id='CheckInExportCSVButton']");

        this.exportCSVButton = this.page.locator("//*[@id='exportCSVButton']");

        this.pastBookingStaffExportCSVButton = this.page.locator("//*[@id='pastBookingStaffExportCSVButton']");

        this.okButton = this.page.locator("//button[text()='OK']");

        this.TimeLoader = this.page.locator("//div[@class='timeloader']");

        this.oktaContinueButton = this.page.locator("//span[text()='Continue with Okta']");

        this.floatingFilterText = this.page.locator("(//div[@ref='eFloatingFilterText'])[1]");


        this.admin_Hourly = this.page.locator("//p[text()='Hourly']");

    }


    parentMenuLocator(menuName: string) {
        return this.page.locator(`//a[text()="${menuName}"]`);
    }

    zoneCheckboxLocator(zoneName: string) {
        return this.page.locator(`xpath=(//label[normalize-space() = "${zoneName}"])[1]//input[@type="checkbox"]`);

    }

    ReportNameLocator(Name: string) {
        return this.page.locator(`(//div[@ref='centerContainer']//div[@col-id='name']//a[normalize-space(text())='${Name}'])[1]`);
    }

    zoneCheckboxSelector(zoneName: string) {
        return this.page.locator(`(//label[normalize-space(text())='${zoneName}']/input[@type='checkbox'])[1]`);
    }






}